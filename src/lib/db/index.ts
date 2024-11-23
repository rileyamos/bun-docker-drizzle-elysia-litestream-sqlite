import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

// Establish the sqlite connection
export const sqlite = new Database(process.env.DATABASE_PATH);

// Run the non-persistent PRAGMA
try {
  sqlite.run("PRAGMA foreign_keys = ON;");
  sqlite.run("PRAGMA synchronous = NORMAL;");
  sqlite.run("PRAGMA busy_timeout = 5000;");
} catch (err) {
  console.error("Error setting pragmas:", err);
}

export const db = drizzle(sqlite);
