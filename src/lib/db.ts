import Database from "better-sqlite3";

export const db = new Database("todo.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEX NOT NULL,
    done INTEGER NOT NULL DEFAULT 0)
`).run();