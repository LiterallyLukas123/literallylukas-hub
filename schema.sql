-- literallylukas.dev hub — guestbook schema
-- Run with: wrangler d1 execute hub-db --file=schema.sql --remote

CREATE TABLE IF NOT EXISTS guests (
  id         TEXT PRIMARY KEY,
  who        TEXT NOT NULL,
  msg        TEXT NOT NULL,
  parent_id  TEXT,
  ip_hash    TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES guests(id)
);

CREATE INDEX IF NOT EXISTS idx_guests_parent ON guests(parent_id);
CREATE INDEX IF NOT EXISTS idx_guests_ip     ON guests(ip_hash);
CREATE INDEX IF NOT EXISTS idx_guests_time   ON guests(created_at);
