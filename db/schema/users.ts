import type { AnySQLiteColumn } from 'drizzle-orm/sqlite-core'
import * as t from 'drizzle-orm/sqlite-core'
import { sqliteTable as table } from 'drizzle-orm/sqlite-core'
export const users = table(
  'users',
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    firstName: t.text('first_name'),
    lastName: t.text('last_name'),
    email: t.text().notNull(),
    password: t.text().notNull(),
    invitee: t.int().references((): AnySQLiteColumn => users.id),
    role: t.text().$type<'guest' | 'user' | 'admin'>().default('guest'),
  },
  (table) => [t.uniqueIndex('email_idx').on(table.email)],
)
