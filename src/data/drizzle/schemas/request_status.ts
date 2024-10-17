import { relations } from 'drizzle-orm'
import { varchar, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { request } from './request'

export const requestStatus = pgTable('request_status', {
  id: uuid('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const requestStatusRelations = relations(requestStatus, ({ many }) => ({
  requests: many(request)
}))