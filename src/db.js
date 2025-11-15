import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

/**
 * Open and init database
 */
export async function getDb() {
  if (db) return db;
  const databasePath = process.env.DATABASE_PATH || path.join(__dirname, '..', '..', 'data', 'poker.db');

  db = await open({
    filename: databasePath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS players (
      user_id TEXT PRIMARY KEY,
      username TEXT,
      wins INTEGER DEFAULT 0,
      losses INTEGER DEFAULT 0,
      chips INTEGER DEFAULT 0,
      updated_at TEXT
    );
  `);

  await db.exec(`
    CREATE INDEX IF NOT EXISTS idx_players_wins ON players(wins DESC);
  `);

  return db;
}

/**
 * Upsert a player record
 */
export async function upsertPlayer({ userId, username }) {
  const db = await getDb();
  const now = new Date().toISOString();
  await db.run(
    `
    INSERT INTO players (user_id, username, wins, losses, chips, updated_at)
    VALUES (?, ?, 0, 0, 0, ?)
    ON CONFLICT(user_id) DO UPDATE SET username = excluded.username, updated_at = excluded.updated_at;
    `,
    [userId, username, now]
  );
}

/**
 * Add a win (and optionally adjust chips)
 */
export async function addWin({ userId, username, chipsDelta = 0 }) {
  const db = await getDb();
  await upsertPlayer({ userId, username });
  const now = new Date().toISOString();
  await db.run(
    `UPDATE players SET wins = wins + 1, chips = chips + ?, updated_at = ? WHERE user_id = ?`,
    [chipsDelta, now, userId]
  );
}

/**
 * Add a loss (and optionally adjust chips)
 */
export async function addLoss({ userId, username, chipsDelta = 0 }) {
  const db = await getDb();
  await upsertPlayer({ userId, username });
  const now = new Date().toISOString();
  await db.run(
    `UPDATE players SET losses = losses + 1, chips = chips + ?, updated_at = ? WHERE user_id = ?`,
    [chipsDelta, now, userId]
  );
}

/**
 * Get top players (by wins)
 */
export async function getTopByWins(limit = 10) {
  const db = await getDb();
  return db.all(
    `SELECT user_id, username, wins, losses, chips
     FROM players
     ORDER BY wins DESC, chips DESC
     LIMIT ?`,
    [limit]
  );
}
