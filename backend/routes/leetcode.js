const express = require("express");
const db = require("../db");

const router = express.Router();

const CACHE_TTL_MS = 60 * 60 * 1000; // re-fetch at most once an hour
let memoryCache = null; // { username, data, fetchedAt }

const QUERY = `
  query userProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

function getStoredCache() {
  const row = db.prepare("SELECT value FROM admin_settings WHERE key = 'leetcode_cache'").get();
  if (!row) return null;
  try {
    return JSON.parse(row.value);
  } catch {
    return null;
  }
}

function setStoredCache(payload) {
  const value = JSON.stringify(payload);
  db.prepare(
    `INSERT INTO admin_settings (key, value) VALUES ('leetcode_cache', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`
  ).run(value);
}

function shapeResponse(raw, username) {
  const solved = {};
  raw.matchedUser.submitStats.acSubmissionNum.forEach((s) => {
    solved[s.difficulty] = s.count;
  });
  const totals = {};
  raw.allQuestionsCount.forEach((s) => {
    totals[s.difficulty] = s.count;
  });

  return {
    username,
    ranking: raw.matchedUser.profile ? raw.matchedUser.profile.ranking : null,
    totalSolved: solved.All || 0,
    totalQuestions: totals.All || 0,
    easy: { solved: solved.Easy || 0, total: totals.Easy || 0 },
    medium: { solved: solved.Medium || 0, total: totals.Medium || 0 },
    hard: { solved: solved.Hard || 0, total: totals.Hard || 0 },
  };
}

// Calls LeetCode's own (undocumented, unofficial) GraphQL endpoint. This is
// the same endpoint leetcode.com itself uses to render a public profile page,
// but it isn't a supported public API - it can change or start rate-limiting
// without notice, which is exactly why this route caches aggressively and
// falls back to the last known-good result (or the manual config numbers on
// the frontend) if the live call fails.
async function fetchFromLeetCode(username) {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/${username}/`,
      Origin: "https://leetcode.com",
      "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
    },
    body: JSON.stringify({ query: QUERY, variables: { username } }),
  });

  if (!res.ok) throw new Error(`LeetCode responded with HTTP ${res.status}`);

  const json = await res.json();
  if (!json.data || !json.data.matchedUser) {
    throw new Error("Unexpected LeetCode response shape (user not found or query blocked)");
  }

  return shapeResponse(json.data, username);
}

// GET /api/leetcode?username=xxx  (defaults to LEETCODE_USERNAME from .env)
router.get("/", async (req, res) => {
  const username = req.query.username || process.env.LEETCODE_USERNAME;

  if (!username) {
    return res
      .status(400)
      .json({ error: "No LeetCode username configured. Set LEETCODE_USERNAME in backend/.env" });
  }

  const now = Date.now();

  if (memoryCache && memoryCache.username === username && now - memoryCache.fetchedAt < CACHE_TTL_MS) {
    return res.json({ ...memoryCache.data, source: "cache", fetchedAt: memoryCache.fetchedAt });
  }

  try {
    const data = await fetchFromLeetCode(username);
    memoryCache = { username, data, fetchedAt: now };
    setStoredCache({ username, data, fetchedAt: now });
    return res.json({ ...data, source: "live", fetchedAt: now });
  } catch (err) {
    console.error("[leetcode] Live fetch failed:", err.message);

    // Fall back to the last known-good response, persisted in SQLite so it
    // survives server restarts. If we have nothing at all, the frontend is
    // responsible for falling back to the manual numbers in config/data.js.
    const stored = getStoredCache();
    if (stored && stored.username === username) {
      return res.json({
        ...stored.data,
        source: "stale-cache",
        fetchedAt: stored.fetchedAt,
        error: err.message,
      });
    }

    return res.status(502).json({ error: "Could not fetch live LeetCode data", detail: err.message });
  }
});

module.exports = router;