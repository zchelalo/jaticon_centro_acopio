import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { user } from './user'
import { tokenType } from './tokenType'

export const token = pgTable('tokens', {
  id: uuid('id').primaryKey(),
  token: text('token').notNull().unique(),
  userId: uuid('user_id').notNull().references(() => user.id),
  tokenTypeId: uuid('token_type_id').notNull().references(() => tokenType.id),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const tokenRelations = relations(token, ({ one }) => ({
  user: one(user, {
    fields: [token.userId],
    references: [user.id]
  }),
  tokenType: one(tokenType, {
    fields: [token.tokenTypeId],
    references: [tokenType.id]
  })
}))