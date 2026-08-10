const express = require("express");
const db = require("../db");
const { sendMessageNotification } = require("../utils/mailer");

const router = express.Router();

function getIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (fwd) return fwd.split(",")[0].trim();
  return req.socket.remoteAddress || "unknown";
}

// POST /api/message
// body: { visitorKey?: string, name: string, email?: string, message: string }
router.post("/", (req, res) => {
  const { visitorKey, name, email, message } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  let visitorId = null;
  if (visitorKey) {
    const visitor = db.prepare("SELECT * FROM visitors WHERE visitor_key = ?").get(visitorKey);
    if (visitor) visitorId = visitor.id;
  }

  const now = new Date().toISOString();
  const ip = getIp(req);

  db.prepare(
    `INSERT INTO messages (visitor_id, name, email, message, ip_address, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(visitorId, name.trim(), (email || "").trim(), message.trim(), ip, now);

  // Fire-and-forget: notify the site owner by email. Never blocks the response.
  sendMessageNotification({ name: name.trim(), email: (email || "").trim(), message: message.trim() });

  res.json({ ok: true });
});

module.exports = router;
