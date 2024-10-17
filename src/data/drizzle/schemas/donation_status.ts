import { relations } from 'drizzle-orm'
import { varchar, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { donation } from './donation'

export const donationStatus = pgTable('donation_status', {
  id: uuid('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const donationStatusRelations = relations(donationStatus, ({ many }) => ({
  donations: many(donation)
}))