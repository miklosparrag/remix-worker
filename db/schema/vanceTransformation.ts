import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import { createdAt } from "./helpers";

export const vanceTransformation = table(
  "vanceTransformation",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    transId: t.text().notNull(),
    name: t.text().notNull(),
    status: t.text().notNull(),
    ...createdAt,
  },
  (table) => [
    t.uniqueIndex("vanceTransformation_transId_idx").on(table.transId),
    t.index("vanceTransformation_createdat_idx").on(table.createdAt),
  ]
);
