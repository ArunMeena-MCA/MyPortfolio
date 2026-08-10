const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "data", "portfolio.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

db.exec(`
  CREATE TABLE IF NOT EXISTS visitors (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_key   TEXT UNIQUE NOT NULL,     -- fingerprint hash (primary identity)
    ip_address    TEXT,
    user_agent    TEXT,
    name          TEXT,                     -- optional, given via the "introduce yourself" popup
    email         TEXT,                     -- optional
    note          TEXT,                     -- optional message left in the intro popup
    introduced    INTEGER DEFAULT 0,        -- 1 once they've filled the popup
    first_seen    TEXT NOT NULL,
    last_seen     TEXT NOT NULL,
    visit_count   INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS visits (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id    INTEGER NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
    page          TEXT,
    ip_address    TEXT,
    user_agent    TEXT,
    visited_at    TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS messages (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id    INTEGER REFERENCES visitors(id) ON DELETE SET NULL,
    name          TEXT NOT NULL,
    email         TEXT,
    message       TEXT NOT NULL,
    ip_address    TEXT,
    created_at    TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin_sessions (
    token         TEXT PRIMARY KEY,
    created_at    TEXT NOT NULL,
    expires_at    TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin_settings (
    key           TEXT PRIMARY KEY,
    value         TEXT NOT NULL
  );
`);

// Seed default analytics password ("1") if not already set.
const existing = db.prepare("SELECT value FROM admin_settings WHERE key = 'analytics_password'").get();
if (!existing) {
  db.prepare("INSERT INTO admin_settings (key, value) VALUES ('analytics_password', ?)").run(
    process.env.ANALYTICS_PASSWORD || "1"
  );
}

module.exports = db;
