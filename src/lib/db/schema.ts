import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// DEMO SCHEMA: Replace this with your actual schema
export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
});
