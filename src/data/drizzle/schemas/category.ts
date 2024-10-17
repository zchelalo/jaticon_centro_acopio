import { relations } from 'drizzle-orm'
import { varchar, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { donation } from './donation'
import { request } from './request'

export const category = pgTable('categories', {
  id: uuid('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const categoryRelations = relations(category, ({ many }) => ({
  donations: many(donation),
  requests: many(request)
}))