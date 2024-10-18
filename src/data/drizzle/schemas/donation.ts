import { relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid, text, varchar } from 'drizzle-orm/pg-core'
import { donar } from './donar'
import { category } from './category'
import { collectionCenter } from './collection_center'
import { donationStatus } from './donation_status'
import { donorAppointment } from './donor_appointment'
import { beneficiaryAppointment } from './beneficiary_appointment'

export const donation = pgTable('donations', {
  id: uuid('id').primaryKey(),
  donarId: uuid('donar_id').notNull().references(() => donar.id),
  categoryId: uuid('category_id').notNull().references(() => category.id),
  collectionCenterId: uuid('collection_center_id').notNull().references(() => collectionCenter.id),
  donationStatusId: uuid('donation_status_id').notNull().references(() => donationStatus.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const donationRelations = relations(donation, ({ one }) => ({
  donar: one(donar, {
    fields: [donation.donarId],
    references: [donar.id]
  }),
  category: one(category, {
    fields: [donation.categoryId],
    references: [category.id]
  }),
  collectionCenter: one(collectionCenter, {
    fields: [donation.collectionCenterId],
    references: [collectionCenter.id]
  }),
  donationStatus: one(donationStatus, {
    fields: [donation.donationStatusId],
    references: [donationStatus.id]
  }),
  donorAppointment: one(donorAppointment, {
    fields: [donation.id],
    references: [donorAppointment.donationId]
  }),
  beneficiaryAppointment: one(beneficiaryAppointment, {
    fields: [donation.id],
    references: [beneficiaryAppointment.donationId]
  })
}))