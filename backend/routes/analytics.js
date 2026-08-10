const express = require("express");
const crypto = require("crypto");
const db = require("../db");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

// POST /api/analytics/login  { password }
router.post("/login", (req, res) => {
  const { password } = req.body || {};
  const row = db.prepare("SELECT value FROM admin_settings WHERE key = 'analytics_password'").get();
  const correctPassword = row ? row.value : "1";

  if (password !== correctPassword) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_TTL_MS);

  db.prepare("INSERT INTO admin_sessions (token, created_at, expires_at) VALUES (?, ?, ?)").run(
    token,
    now.toISOString(),
    expires.toISOString()
  );

  res.cookie("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    expires,
  });

  res.json({ ok: true });
});

// POST /api/analytics/logout
router.post("/logout", (req, res) => {
  const token = req.cookies && req.cookies.admin_token;
  if (token) db.prepare("DELETE FROM admin_sessions WHERE token = ?").run(token);
  res.clearCookie("admin_token");
  res.json({ ok: true });
});

// POST /api/analytics/change-password  { currentPassword, newPassword }  (must be logged in)
router.post("/change-password", requireAdmin, (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  const row = db.prepare("SELECT value FROM admin_settings WHERE key = 'analytics_password'").get();
  const correctPassword = row ? row.value : "1";

  if (currentPassword !== correctPassword) {
    return res.status(401).json({ error: "Current password is incorrect" });
  }
  if (!newPassword || newPassword.length < 1) {
    return res.status(400).json({ error: "New password required" });
  }

  db.prepare("UPDATE admin_settings SET value = ? WHERE key = 'analytics_password'").run(newPassword);
  res.json({ ok: true });
});

// GET /api/analytics/me - check if the current cookie is a valid admin session
router.get("/me", requireAdmin, (req, res) => {
  res.json({ ok: true });
});

// GET /api/analytics/summary - protected
router.get("/summary", requireAdmin, (req, res) => {
  const totals = db
    .prepare(
      `SELECT
        (SELECT COUNT(*) FROM visitors) AS unique_visitors,
        (SELECT COUNT(*) FROM visits) AS total_visits,
        (SELECT COUNT(*) FROM messages) AS total_messages,
        (SELECT COUNT(*) FROM visitors WHERE introduced = 1) AS introduced_visitors`
    )
    .get();

  const visitors = db
    .prepare(
      `SELECT id, visitor_key, ip_address, name, email, note, introduced,
              first_seen, last_seen, visit_count
       FROM visitors
       ORDER BY last_seen DESC`
    )
    .all();

  const visits = db
    .prepare(
      `SELECT visits.id, visits.visitor_id, visits.page, visits.ip_address, visits.visited_at,
              visitors.name, visitors.visitor_key
       FROM visits
       JOIN visitors ON visitors.id = visits.visitor_id
       ORDER BY visits.visited_at DESC
       LIMIT 500`
    )
    .all();

  const messages = db
    .prepare(
      `SELECT messages.id, messages.name, messages.email, messages.message,
              messages.ip_address, messages.created_at, visitors.visitor_key
       FROM messages
       LEFT JOIN visitors ON visitors.id = messages.visitor_id
       ORDER BY messages.created_at DESC`
    )
    .all();

  // Visits-per-day for a simple trend chart (last 30 days)
  const dailyVisits = db
    .prepare(
      `SELECT substr(visited_at, 1, 10) AS day, COUNT(*) AS count
       FROM visits
       GROUP BY day
       ORDER BY day DESC
       LIMIT 30`
    )
    .all();

  res.json({ totals, visitors, visits, messages, dailyVisits });
});

module.exports = router;
