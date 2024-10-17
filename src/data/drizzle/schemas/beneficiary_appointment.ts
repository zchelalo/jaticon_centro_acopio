import { relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { donation } from './donation'
import { request } from './request'

export const beneficiaryAppointment = pgTable('beneficiary_appointments', {
  id: uuid('id').primaryKey(),
  donationId: uuid('donation_id').notNull().references(() => donation.id),
  requestId: uuid('request_id').notNull().references(() => request.id),
  date: timestamp('date').notNull(),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const beneficiaryAppointmentRelations = relations(beneficiaryAppointment, ({ one }) => ({
  donation: one(donation, {
    fields: [beneficiaryAppointment.donationId],
    references: [donation.id]
  }),
  request: one(request, {
    fields: [beneficiaryAppointment.requestId],
    references: [request.id]
  })
}))