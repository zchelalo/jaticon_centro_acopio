import { relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid, text } from 'drizzle-orm/pg-core'
import { category } from './category'
import { collectionCenter } from './collection_center'
import { donationStatus } from './donation_status'
import { beneficiary } from './beneficiary'
import { requestStatus } from './request_status'
import { beneficiaryAppointment } from './beneficiary_appointment'

export const request = pgTable('requests', {
  id: uuid('id').primaryKey(),
  beneficiaryId: uuid('beneficiary_id').notNull().references(() => beneficiary.id),
  categoryId: uuid('category_id').notNull().references(() => category.id),
  collectionCenterId: uuid('collection_center_id').notNull().references(() => collectionCenter.id),
  requestStatusId: uuid('request_status_id').notNull().references(() => donationStatus.id),
  description: text('description').notNull(),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const requestRelations = relations(request, ({ one }) => ({
  beneficiary: one(beneficiary, {
    fields: [request.beneficiaryId],
    references: [beneficiary.id]
  }),
  category: one(category, {
    fields: [request.categoryId],
    references: [category.id]
  }),
  collectionCenter: one(collectionCenter, {
    fields: [request.collectionCenterId],
    references: [collectionCenter.id]
  }),
  requestStatus: one(requestStatus, {
    fields: [request.requestStatusId],
    references: [requestStatus.id]
  }),
  beneficiaryAppointment: one(beneficiaryAppointment, {
    fields: [request.id],
    references: [beneficiaryAppointment.requestId]
  })
}))