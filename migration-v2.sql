-- literallylukas.dev hub — v2 migration
-- Adds country tagging and ban list.
-- Run with: wrangler d1 execute hub-db --file=migration-v2.sql --remote

ALTER TABLE guests ADD COLUMN country TEXT;

CREATE TABLE IF NOT EXISTS bans (
  ip_hash    TEXT PRIMARY KEY,
  reason     TEXT,
  banned_at  INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_bans_time ON bans(banned_at);
