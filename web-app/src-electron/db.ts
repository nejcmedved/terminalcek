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
         name TEXT NOT NULL UNIQUE
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

  prepareSelectStatement(table: string) {
    const ret = `SELECT * from ${table}`
    return ret
  }

  doSelect(table: string) {
    const statement = this.prepareSelectStatement(table)
    if(!this.db)
      return []
    const db = this.db
    return new Promise((resolve, reject) => {
      db.all(statement, [], (err, rows) => {
        if (err) {
          reject()
        }
        // Log the rows
        console.log('Rows:', rows);
        return resolve(rows)
      });
    })
  }

  prepareInsertStatement(table: string, values: object) {
    const ret = `INSERT INTO ${table} (${Object.keys(values).join(',')}) VALUES (${Object.values(values).map(elem => `"${elem}"`).join(',')})`
    console.log('insert statement ', ret)
    return ret
  }

  doInsert(table: string, values: object) {
    const statement = this.prepareInsertStatement(table, values)
    if(!this.db)
      return
    this.db.run(
        statement,
        (err) => {
          if (err) {
            console.error(`error executing ${statement}`, err.message);
          } else {
            console.log(`statement ${statement} executed`);
          }
        }
      );
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
