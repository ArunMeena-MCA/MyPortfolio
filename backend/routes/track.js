const express = require("express");
const db = require("../db");

const router = express.Router();

function getIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (fwd) return fwd.split(",")[0].trim();
  return req.socket.remoteAddress || "unknown";
}

// POST /api/track
// body: { visitorKey: string, page: string }
// Called once per page-load from the frontend. Upserts the visitor row
// (matched on the browser fingerprint) and logs an individual visit row.
router.post("/", (req, res) => {
  const { visitorKey, page } = req.body || {};

  if (!visitorKey || typeof visitorKey !== "string") {
    return res.status(400).json({ error: "visitorKey is required" });
  }

  const ip = getIp(req);
  const userAgent = req.headers["user-agent"] || "unknown";
  const now = new Date().toISOString();

  const existing = db.prepare("SELECT * FROM visitors WHERE visitor_key = ?").get(visitorKey);

  let visitorId;

  if (existing) {
    db.prepare(
      `UPDATE visitors
       SET last_seen = ?, visit_count = visit_count + 1, ip_address = ?, user_agent = ?
       WHERE id = ?`
    ).run(now, ip, userAgent, existing.id);
    visitorId = existing.id;
  } else {
    const info = db
      .prepare(
        `INSERT INTO visitors (visitor_key, ip_address, user_agent, first_seen, last_seen, visit_count)
         VALUES (?, ?, ?, ?, ?, 1)`
      )
      .run(visitorKey, ip, userAgent, now, now);
    visitorId = info.lastInsertRowid;
  }

  db.prepare(
    `INSERT INTO visits (visitor_id, page, ip_address, user_agent, visited_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run(visitorId, page || "/", ip, userAgent, now);

  const visitor = db.prepare("SELECT * FROM visitors WHERE id = ?").get(visitorId);

  res.json({
    ok: true,
    visitorId,
    visitCount: visitor.visit_count,
    introduced: !!visitor.introduced,
  });
});

module.exports = router;
