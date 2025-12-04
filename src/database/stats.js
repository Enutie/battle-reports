const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const dbPath = path.join(__dirname, '..', '..', 'data', 'battlereports.db');
const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS battles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    game_type TEXT NOT NULL,
    points_size TEXT,
    battleplan TEXT,
    player1_name TEXT NOT NULL,
    player1_faction TEXT NOT NULL,
    player1_spearhead TEXT,
    player1_vp INTEGER NOT NULL,
    player2_name TEXT NOT NULL,
    player2_faction TEXT NOT NULL,
    player2_spearhead TEXT,
    player2_vp INTEGER NOT NULL,
    winner_name TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_player1 ON battles(player1_name);
  CREATE INDEX IF NOT EXISTS idx_player2 ON battles(player2_name);
  CREATE INDEX IF NOT EXISTS idx_faction1 ON battles(player1_faction);
  CREATE INDEX IF NOT EXISTS idx_faction2 ON battles(player2_faction);
  CREATE INDEX IF NOT EXISTS idx_game_type ON battles(game_type);
`);

// Save a battle report
function saveBattle(session) {
  const p1VP = parseInt(session.player1.vp) || 0;
  const p2VP = parseInt(session.player2.vp) || 0;
  
  let winnerName = null;
  if (p1VP > p2VP) winnerName = session.player1.name;
  else if (p2VP > p1VP) winnerName = session.player2.name;

  const stmt = db.prepare(`
    INSERT INTO battles (
      date, game_type, points_size, battleplan,
      player1_name, player1_faction, player1_spearhead, player1_vp,
      player2_name, player2_faction, player2_spearhead, player2_vp,
      winner_name, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    session.date,
    session.gameType,
    session.pointsSize || null,
    session.battleplan || null,
    session.player1.name,
    session.player1.factionLabel,
    session.player1.spearhead || null,
    p1VP,
    session.player2.name,
    session.player2.factionLabel,
    session.player2.spearhead || null,
    p2VP,
    winnerName,
    session.notes || null
  );

  return result.lastInsertRowid;
}

// Get player stats (filtered by game type)
function getPlayerStats(playerName, gameType = null) {
  let query = `
    SELECT 
      COUNT(*) as total_games,
      SUM(CASE WHEN winner_name = ? THEN 1 ELSE 0 END) as wins,
      SUM(CASE WHEN winner_name IS NOT NULL AND winner_name != ? THEN 1 ELSE 0 END) as losses,
      SUM(CASE WHEN winner_name IS NULL THEN 1 ELSE 0 END) as draws,
      SUM(CASE WHEN player1_name = ? THEN player1_vp ELSE player2_vp END) as total_vp
    FROM battles
    WHERE (player1_name = ? OR player2_name = ?)
  `;
  
  const params = [playerName, playerName, playerName, playerName, playerName];
  
  if (gameType) {
    query += ` AND game_type = ?`;
    params.push(gameType);
  }

  return db.prepare(query).get(...params);
}

// Get leaderboard (filtered by game type)
function getLeaderboard(limit = 10, gameType = null) {
  const gameTypeFilter = gameType ? `WHERE game_type = '${gameType}'` : '';
  
  const query = `
    WITH player_stats AS (
      SELECT player1_name as name, 
             CASE WHEN winner_name = player1_name THEN 1 ELSE 0 END as win,
             CASE WHEN winner_name IS NOT NULL AND winner_name != player1_name THEN 1 ELSE 0 END as loss,
             CASE WHEN winner_name IS NULL THEN 1 ELSE 0 END as draw
      FROM battles ${gameTypeFilter}
      UNION ALL
      SELECT player2_name as name,
             CASE WHEN winner_name = player2_name THEN 1 ELSE 0 END as win,
             CASE WHEN winner_name IS NOT NULL AND winner_name != player2_name THEN 1 ELSE 0 END as loss,
             CASE WHEN winner_name IS NULL THEN 1 ELSE 0 END as draw
      FROM battles ${gameTypeFilter}
    )
    SELECT name,
           SUM(win) as wins,
           SUM(loss) as losses,
           SUM(draw) as draws,
           COUNT(*) as total_games,
           ROUND(SUM(win) * 100.0 / COUNT(*), 1) as win_rate
    FROM player_stats
    GROUP BY name
    ORDER BY wins DESC, win_rate DESC
    LIMIT ?
  `;
  
  return db.prepare(query).all(limit);
}

// Get faction stats (filtered by game type)
function getFactionStats(limit = 10, gameType = null) {
  const gameTypeFilter = gameType ? `WHERE game_type = '${gameType}'` : '';
  
  const query = `
    WITH faction_stats AS (
      SELECT player1_faction as faction,
             CASE WHEN winner_name = player1_name THEN 1 ELSE 0 END as win,
             1 as game
      FROM battles ${gameTypeFilter}
      UNION ALL
      SELECT player2_faction as faction,
             CASE WHEN winner_name = player2_name THEN 1 ELSE 0 END as win,
             1 as game
      FROM battles ${gameTypeFilter}
    )
    SELECT faction,
           SUM(win) as wins,
           COUNT(*) as total_games,
           ROUND(SUM(win) * 100.0 / COUNT(*), 1) as win_rate
    FROM faction_stats
    GROUP BY faction
    HAVING total_games >= 2
    ORDER BY win_rate DESC, wins DESC
    LIMIT ?
  `;
  
  return db.prepare(query).all(limit);
}

// Get head-to-head record (filtered by game type)
function getHeadToHead(player1, player2, gameType = null) {
  let query = `
    SELECT 
      SUM(CASE WHEN winner_name = ? THEN 1 ELSE 0 END) as player1_wins,
      SUM(CASE WHEN winner_name = ? THEN 1 ELSE 0 END) as player2_wins,
      SUM(CASE WHEN winner_name IS NULL THEN 1 ELSE 0 END) as draws,
      COUNT(*) as total_games
    FROM battles
    WHERE ((player1_name = ? AND player2_name = ?)
       OR (player1_name = ? AND player2_name = ?))
  `;
  
  const params = [player1, player2, player1, player2, player2, player1];
  
  if (gameType) {
    query += ` AND game_type = ?`;
    params.push(gameType);
  }

  return db.prepare(query).get(...params);
}

module.exports = {
  saveBattle,
  getPlayerStats,
  getLeaderboard,
  getFactionStats,
  getHeadToHead,
};
