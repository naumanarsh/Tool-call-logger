const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const logger = require('../logger');

const dbPath = path.join(process.cwd(), 'tool_logs.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error('Failed to connect to SQLite database', { error: err.message });
  } else {
    logger.info('Connected to SQLite database');
  }
});

const initDb = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tool_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      tool_name TEXT,
      tool_input TEXT,
      tool_output TEXT,
      status_code INTEGER,
      timestamp TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  return new Promise((resolve, reject) => {
    db.run(createTableQuery, (err) => {
      if (err) {
        logger.error('Failed to create tool_logs table', { error: err.message });
        reject(err);
      } else {
        logger.info('tool_logs table is ready');
        resolve();
      }
    });
  });
};

module.exports = {
  db,
  initDb
};
