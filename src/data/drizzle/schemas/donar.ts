import { relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'

import { user } from './user'
import { donation } from './donation'

export const donar = pgTable('donars', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => user.id),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const donarRelations = relations(donar, ({ one, many }) => ({
  user: one(user, {
    fields: [donar.userId],
    references: [user.id]
  }),
  donations: many(donation)
}))