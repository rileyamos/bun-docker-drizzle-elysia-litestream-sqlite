import { Database } from "bun:sqlite";
import { $ } from "bun";

console.log("🌱 Seeding database with demo data...");

if (!process.env.DATABASE_PATH) {
  console.error(
    "DATABASE_PATH not found in .env file. Did you run the setup script? See README.md for more information."
  );
  process.exit(1);
}

await $`bun run drizzle-kit generate`;

const db = new Database(process.env.DATABASE_PATH);

// Insert demo data
const demoContacts = [
  { name: "John Doe", email: "john.doe@example.com" },
  { name: "Jane Smith", email: "jane.smith@example.com" },
  { name: "Bob Wilson", email: "bob.wilson@example.com" },
  { name: "Alice Brown", email: "alice.brown@example.com" },
  { name: "Charlie Davis", email: "charlie.davis@example.com" },
];

const stmt = db.prepare("INSERT INTO contacts (name, email) VALUES (?, ?)");

for (const contact of demoContacts) {
  stmt.run(contact.name, contact.email);
}

console.log("✅ Database seeded with demo data");
