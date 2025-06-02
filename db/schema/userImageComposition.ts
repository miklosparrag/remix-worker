import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import { user } from "./user";
import { imageCompositionTemplate } from "./imageCompositionTemplate";
import { createdAt } from "./helpers";

export const userImageComposition = table(
  "userImageComposition",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    userId: t.integer().references(() => user.id),
    templateId: t.integer().references(() => imageCompositionTemplate.id),
    thumbnail: t.text(),
    image: t.text(),
    params: t.text({ mode: "json" }).notNull().default("{}"),
    configuration: t.text({ mode: "json" }).notNull().default("{}"),
    ...createdAt,
  },
  (table) => [t.index("userImageComposition_userId_idx").on(table.userId)]
);
