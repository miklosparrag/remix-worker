import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const db_path = process.env.LOCAL_DB_PATH!;
export default defineConfig(
  db_path
    ? {
        dialect: "sqlite",
        schema: "./db/schema",
        out: "./drizzle/migrations",
        dbCredentials: {
          url: db_path,
        },
      }
    : {
        dialect: "sqlite",
        schema: "./db/schema",
        out: "./drizzle/migrations",
        driver: "d1-http",
        dbCredentials: {
          accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
          databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
          token: process.env.CLOUDFLARE_API_TOKEN!,
        },
      }
);
