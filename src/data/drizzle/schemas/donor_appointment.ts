import { relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { donation } from './donation'

export const donorAppointment = pgTable('donor_appointments', {
  id: uuid('id').primaryKey(),
  donationId: uuid('donation_id').notNull().references(() => donation.id),
  date: timestamp('date').notNull(),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const donorAppointmentRelations = relations(donorAppointment, ({ one }) => ({
  donation: one(donation, {
    fields: [donorAppointment.donationId],
    references: [donation.id]
  })
}))