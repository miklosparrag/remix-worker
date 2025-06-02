import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import { createdAt } from "./helpers";

export const vanceUpload = table(
  "vanceUpload",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    uid: t.text().notNull(),
    name: t.text().notNull(),
    thumbnail: t.text().notNull(),
    width: t.integer().notNull(),
    height: t.integer().notNull(),
    filesize: t.integer().notNull(),
    ...createdAt,
  },
  (table) => [
    t.uniqueIndex("VanceUpload_uid_idx").on(table.uid),
    t.index("VanceUpload_createdat_idx").on(table.createdAt),
  ]
);
