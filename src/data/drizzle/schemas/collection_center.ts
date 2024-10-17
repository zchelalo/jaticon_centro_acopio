import { relations } from 'drizzle-orm'
import { varchar, pgTable, timestamp, uuid, text } from 'drizzle-orm/pg-core'
import { donation } from './donation'
import { request } from './request'

export const collectionCenter = pgTable('collection_centers', {
  id: uuid('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  latitude: varchar('latitude', { length: 255 }).notNull(),
  longitude: varchar('longitude', { length: 255 }).notNull(),
  observation: text('observation').notNull(),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const collectionCenterRelations = relations(collectionCenter, ({ many }) => ({
  donations: many(donation),
  requests: many(request)
}))