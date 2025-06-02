import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { user } from "./user";
import { createdAt } from "./helpers";
import { multiTransformationConfig } from "./multiTransformationConfig";

export const multiTransformationJob = table(
  "multiTransformationJob",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    userId: t.integer().references(() => user.id),
    configId: t.integer().references(() => multiTransformationConfig.id),
    statusDetails: t.text({ mode: "json" }).notNull().default("{}"),
    status: t
      .text()
      .$type<"pending" | "processing" | "completed" | "failed">()
      .notNull(),
    ...createdAt,
  },
  (table) => [
    t.index("multiTransformationJob_createdat_idx").on(table.createdAt),
    t.index("multiTransformationJob_userId_idx").on(table.userId),
  ]
);
