import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { user } from "./user";
import { createdAt } from "./helpers";

export const imageCompositionTemplate = table(
  "imageCompositionTemplate",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    name: t.text().notNull(),
    description: t.text().notNull(),
    example: t.text().notNull(),
    params: t.text({ mode: "json" }),
    schema: t.text({ mode: "json" }),
    ...createdAt,
  }
  //(table) => [t.uniqueIndex("uid_idx").on(table.uid)]
);
