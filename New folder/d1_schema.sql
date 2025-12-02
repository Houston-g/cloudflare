-- D1 schema for orders, tickets, and kb revisions
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  sku TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS tickets (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS kb_revisions (
  key TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  version INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
