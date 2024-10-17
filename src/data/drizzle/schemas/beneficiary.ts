import { relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'

import { user } from './user'
import { request } from './request'

export const beneficiary = pgTable('beneficiaries', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => user.id),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const beneficiaryRelations = relations(beneficiary, ({ one, many }) => ({
  user: one(user, {
    fields: [beneficiary.userId],
    references: [user.id]
  }),
  requests: many(request)
}))