import * as t from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const createdAt = {
  createdAt: t
    .integer("timestamp1", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
};
