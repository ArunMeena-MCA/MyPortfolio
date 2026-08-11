const express = require("express");
const db = require("../db");

const router = express.Router();

const CACHE_TTL_MS = 60 * 60 * 1000; // re-fetch at most once an hour
let memoryCache = null; // { username, data, fetchedAt }

// GFG has no public API, but its own site calls these two internal JSON
// endpoints to render a profile page - this uses the same ones. Still
// unofficial/undocumented, so it can change without notice.
const PROFILE_URL = "https://authapi.geeksforgeeks.org/api-get/user-profile-info/";
const SUBMISSIONS_URL = "https://practiceapi.geeksforgeeks.org/api/v1/user/problems/submissions/";
const GFG_HEADERS = {
  Accept: "application/json, text/plain, */*",
  Origin: "https://www.geeksforgeeks.org",
  Referer: "https://www.geeksforgeeks.org/",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
};

function getStoredCache() {
  const row = db.prepare("SELECT value FROM admin_settings WHERE key = 'gfg_cache'").get();
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
    `INSERT INTO admin_settings (key, value) VALUES ('gfg_cache', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`
  ).run(value);
}

async function fetchProfile(username) {
  const url = new URL(PROFILE_URL);
  url.searchParams.set("handle", username);
  url.searchParams.set("article_count", "false");
  url.searchParams.set("redirect", "true");

  const res = await fetch(url, { headers: GFG_HEADERS });
  if (!res.ok) throw new Error(`GFG profile endpoint responded with HTTP ${res.status}`);

  const json = await res.json();
  if (!json.data) throw new Error(`No profile data returned for '${username}' (check the handle is correct)`);
  return json.data;
}

async function fetchSubmissions(username) {
  const res = await fetch(SUBMISSIONS_URL, {
    method: "POST",
    headers: { ...GFG_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ handle: username, requestType: "", year: "", month: "" }),
  });
  if (!res.ok) throw new Error(`GFG submissions endpoint responded with HTTP ${res.status}`);

  const json = await res.json();
  if (json.status === "failed" || !json.result) {
    throw new Error(`No submission data returned for '${username}'`);
  }
  return json;
}

function countByDifficulty(submissionPayload) {
  const counts = { school: 0, basic: 0, easy: 0, medium: 0, hard: 0 };
  const result = submissionPayload.result || {};
  for (const [difficulty, problems] of Object.entries(result)) {
    const key = difficulty.toLowerCase();
    if (key in counts) counts[key] = Object.keys(problems).length;
  }
  return counts;
}

async function fetchFromGfg(username) {
  const [profile, submissions] = await Promise.all([fetchProfile(username), fetchSubmissions(username)]);
  const counts = countByDifficulty(submissions);
  const totalSolved = Number(profile.total_problems_solved ?? submissions.count ?? 0);

  return {
    username,
    totalSolved,
    codingScore: profile.score != null ? Number(profile.score) : null,
    instituteRank: profile.institute_rank != null ? Number(profile.institute_rank) : null,
    school: counts.school,
    basic: counts.basic,
    easy: counts.easy,
    medium: counts.medium,
    hard: counts.hard,
  };
}

// GET /api/gfg?username=xxx  (defaults to GFG_USERNAME from .env)
router.get("/", async (req, res) => {
  const username = req.query.username || process.env.GFG_USERNAME;

  if (!username) {
    return res.status(400).json({ error: "No GeeksforGeeks username configured. Set GFG_USERNAME in backend/.env" });
  }

  const now = Date.now();

  if (memoryCache && memoryCache.username === username && now - memoryCache.fetchedAt < CACHE_TTL_MS) {
    return res.json({ ...memoryCache.data, source: "cache", fetchedAt: memoryCache.fetchedAt });
  }

  try {
    const data = await fetchFromGfg(username);
    memoryCache = { username, data, fetchedAt: now };
    setStoredCache({ username, data, fetchedAt: now });
    return res.json({ ...data, source: "live", fetchedAt: now });
  } catch (err) {
    console.error("[gfg] Live fetch failed:", err.message);

    const stored = getStoredCache();
    if (stored && stored.username === username) {
      return res.json({
        ...stored.data,
        source: "stale-cache",
        fetchedAt: stored.fetchedAt,
        error: err.message,
      });
    }

    return res.status(502).json({ error: "Could not fetch live GeeksforGeeks data", detail: err.message });
  }
});

module.exports = router;