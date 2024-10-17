import { relations } from 'drizzle-orm'
import { pgTable, varchar, timestamp, boolean, uuid } from 'drizzle-orm/pg-core'

import { token } from './token'
import { donar } from './donar'
import { beneficiary } from './beneficiary'

export const user = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  lastName1: varchar('last_name_1', { length: 50 }).notNull(),
  lastName2: varchar('last_name_2', { length: 50 }),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 100 }).notNull(),
  verified: boolean('verified').default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const userRelations = relations(user, ({ one, many }) => ({
  tokens: many(token),
  donar: one(donar, {
    fields: [user.id],
    references: [donar.userId]
  }),
  beneficiary: one(beneficiary, {
    fields: [user.id],
    references: [beneficiary.userId]
  })
}))