import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import { createdAt } from "./helpers";

export const user = table(
  "user",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    shopifyCustomerId: t.text(),
    firstName: t.text(),
    lastName: t.text(),
    email: t.text(),
    password: t.text(),
    role: t.text().$type<"guest" | "user" | "admin">().default("guest"),
    ...createdAt,
  },
  (table) => [
    t.uniqueIndex("user_shopifyCustomerId_idx").on(table.shopifyCustomerId),
  ]
);
