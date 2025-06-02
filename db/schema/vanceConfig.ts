import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const vanceConfig = table(
  "vanceConfig",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    name: t.text().notNull(),
    description: t.text().notNull(),
    params: t.text({ mode: "json" }).default("{}"),
    config: t.text({ mode: "json" }).notNull().default("{}"),
  }
  //(table) => [t.uniqueIndex("uid_idx").on(table.uid)]
);
