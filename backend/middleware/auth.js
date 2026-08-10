const db = require("../db");

/**
 * Protects /api/analytics/* routes. Expects an "admin_token" cookie that was
 * issued by POST /api/analytics/login and hasn't expired yet.
 */
function requireAdmin(req, res, next) {
  const token = req.cookies && req.cookies.admin_token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const session = db.prepare("SELECT * FROM admin_sessions WHERE token = ?").get(token);

  if (!session) {
    return res.status(401).json({ error: "Invalid session" });
  }

  if (new Date(session.expires_at).getTime() < Date.now()) {
    db.prepare("DELETE FROM admin_sessions WHERE token = ?").run(token);
    return res.status(401).json({ error: "Session expired" });
  }

  next();
}

module.exports = { requireAdmin };
