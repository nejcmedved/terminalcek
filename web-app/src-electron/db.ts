// app.ts

import sqlite3 from 'sqlite3';

const DB_NAME = 'terminalcek.db'

// Enable verbose mode to help with debugging
sqlite3.verbose();

export class TerminalcekDb {
  db: sqlite3.Database | null = null;

  constructor() {
    this.initdb()
  }

  initdb() {
    if(!this.db)
      return

    this.db = new sqlite3.Database(DB_NAME, (err) => {
      if (err) {
        console.error('Could not connect to the database:', err.message);
        return;
      }
      console.log('Connected to the SQLite database.');
    });
    this.createTables()
  }

  createTables() {
    if(!this.db)
      return
    this.db.serialize(() => {
      if(!this.db)
        return
      // Create a table
      this.db.run(
        `CREATE TABLE IF NOT EXISTS workspace (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL
        )`,
        (err) => {
          if (err) {
            console.error('Error creating workspace table:', err.message);
          } else {
            console.log('Table workspace created or already exists.');
          }
        }
      );
    });
  }

  closedb() {
    if (!this.db)
      return
    this.db.close((err) => {
      if (err) {
        console.error('Error closing the database connection:', err.message);
      } else {
        console.log('Closed the database connection.');
      }
    });
  }
}

/*
// Create a new database instance (creates a file named 'mydatabase.db')
const

// Create a new table, insert data, and query the data
db.serialize(() => {
  // Create a table
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE
    )`,
    (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table created or already exists.');
      }
    }
  );

  // Insert data into the table
  const insertStmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  insertStmt.run('Alice', 'alice@example.com', (err) => {
    if (err) {
      console.error('Error inserting Alice:', err.message);
    }
  });
  insertStmt.run('Bob', 'bob@example.com', (err) => {
    if (err) {
      console.error('Error inserting Bob:', err.message);
    }
  });
  insertStmt.finalize();

  // Query the data
  db.each(
    'SELECT id, name, email FROM users',
    (err, row) => {
      if (err) {
        console.error('Error querying data:', err.message);
      } else {
        console.log(`User: ${row.id}, Name: ${row.name}, Email: ${row.email}`);
      }
    }
  );
});

// Close the database connection

*/
