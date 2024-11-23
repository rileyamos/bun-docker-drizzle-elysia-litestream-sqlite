import { $ } from "bun";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

console.group("[start.ts]");
console.log("Checking database configuration...");

try {
  if (!process.env.DATABASE_PATH) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "DATABASE_PATH is not set. Did you run the setup script? See README.md for more information."
      );
    } else {
      throw new Error(
        "DATABASE_PATH is not set. Please set the DATABASE_PATH environment variable."
      );
    }
  }

  const sqlite = new Database(process.env.DATABASE_PATH, {
    strict: true,
    create: true,
  });

  sqlite.run("PRAGMA journal_mode = WAL;");
  console.log("journal_mode:", sqlite.query("PRAGMA journal_mode;").get());

  const db = drizzle(sqlite);
  migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Database migration complete.");
  console.log("🚀 Starting the application ");
  console.groupEnd();

  // Runs the compiled binary
  await $`./server`;
} catch (error) {
  if (
    error instanceof Error &&
    "code" in error &&
    error.code === "SQLITE_CANTOPEN"
  ) {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "🚨 Development database does not exist, did you run the setup script? See README.md for more information."
      );
    } else {
      console.error(error);
    }
  }

  console.error(error);
  process.exit(1);
}
