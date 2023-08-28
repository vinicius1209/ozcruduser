import sqlite3Source from "sqlite3";

const sqlite3 = sqlite3Source.verbose();

const dbPath = process.env.NODE_ENV === 'test' ? ':memory:' : (process.env.DATABASE_PATH || "config/database/db.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("Erro ao inicializar o DB: ", err.message);
    return false;
  }
  console.log("Conectado ao banco de dados SQLite : ", dbPath);
  return true;
});

db.run(
  `
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        idade INTEGER CHECK(idade >= 18)
    )
`,
  (err) => {
    if (err) throw err;
  }
);

export default db;
