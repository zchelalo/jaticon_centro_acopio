import { z } from 'zod'

export const getDonationByIdSchema = z.object({
  id: z.string().uuid()
})

export const listDonationsSchema = z.object({
  page: z.number().int().positive().or(
    z.string().regex(/^[0-9]+$/).refine(val => {
      const num = parseInt(val, 10)
      return Number.isInteger(num) && num > 0
    }, {
      message: "Invalid page number"
    })
  ),
  limit: z.number().int().positive().or(
    z.string().regex(/^[0-9]+$/).refine(val => {
      const num = parseInt(val, 10)
      return Number.isInteger(num) && num > 0
    }, {
      message: "Invalid limit number"
    })
  ),
  name: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  collectionCenterId: z.string().uuid().optional()
})

export const createDonationRequestSchema = z.object({
  categoryId: z.string().uuid(),
  collectionCenterId: z.string().uuid(),
  name: z.string(),
  description: z.string()
})

export const createDonationSchema = z.object({
  categoryId: z.string().uuid(),
  donarId: z.string().uuid(),
  collectionCenterId: z.string().uuid(),
  name: z.string(),
  description: z.string()
})