import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
export function openDatabase(
  filename = process.env.LEARNING_DB || path.resolve("data/learning.sqlite"),
) {
  if (filename !== ":memory:")
    fs.mkdirSync(path.dirname(filename), { recursive: true });
  const db = new Database(filename);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(`CREATE TABLE IF NOT EXISTS migrations(version INTEGER PRIMARY KEY);
 CREATE TABLE IF NOT EXISTS workspaces(id TEXT PRIMARY KEY, revision INTEGER NOT NULL, data TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS progress(id TEXT PRIMARY KEY, data TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS settings(id TEXT PRIMARY KEY, data TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS attempts(id INTEGER PRIMARY KEY AUTOINCREMENT, activity_id TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
 INSERT OR IGNORE INTO migrations VALUES(1);`);
  return db;
}
