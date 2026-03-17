import Database from "better-sqlite3";

export const db = new Database("todo.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT false)
`).run();