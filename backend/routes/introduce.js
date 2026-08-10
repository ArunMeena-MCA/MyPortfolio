const express = require("express");
const db = require("../db");

const router = express.Router();

// POST /api/introduce
// body: { visitorKey: string, name?: string, email?: string, note?: string }
// Saves the optional identity a visitor volunteers via the corner popup.
router.post("/", (req, res) => {
  const { visitorKey, name, email, note } = req.body || {};

  if (!visitorKey) {
    return res.status(400).json({ error: "visitorKey is required" });
  }
  if (!name && !email && !note) {
    return res.status(400).json({ error: "Provide at least a name, email, or note" });
  }

  const visitor = db.prepare("SELECT * FROM visitors WHERE visitor_key = ?").get(visitorKey);
  if (!visitor) {
    return res.status(404).json({ error: "Unknown visitor - call /api/track first" });
  }

  db.prepare(
    `UPDATE visitors SET name = ?, email = ?, note = ?, introduced = 1 WHERE id = ?`
  ).run(name || visitor.name, email || visitor.email, note || visitor.note, visitor.id);

  res.json({ ok: true });
});

module.exports = router;
