import { Elysia } from "elysia";
import { db } from "./lib/db";
import { contacts } from "./lib/db/schema"; // TODO: Replace with your actual schema

const app = new Elysia()
  .get("/", async () => {
    return db.select().from(contacts);
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
