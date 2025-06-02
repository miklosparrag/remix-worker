import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import { user } from "./user";
import { createdAt } from "./helpers";

export const userImage = table(
  "userImage",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    name: t.text().notNull(),
    thumbnail: t.text().notNull(),
    width: t.integer().notNull(),
    height: t.integer().notNull(),
    filesize: t.integer().notNull(),
    origin: t.text().$type<"clean" | "processed" | "composition">(),
    category: t.text(),
    userId: t.integer("userId").references(() => user.id),
    provider: t.text().$type<"imagekit" | "cloudinary">().notNull(),
    uid: t.text().notNull(),
    ...createdAt,
  },
  (table) => [
    t.uniqueIndex("userImage_uid_idx").on(table.uid),
    t.index("userImage_userId_idx").on(table.userId),
  ]
);
