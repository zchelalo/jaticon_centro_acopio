import '../../../config'
import { db } from './orm'
import * as schema from '../schemas'
import { logger } from 'src/helpers/logger'
import { v4 } from 'uuid'
import {
  tokenTypes as tokenTypesEnum,
  categories as categoriesEnum,
  donationStatus as donationStatusEnum,
  requestStatus as requestStatusEnum
} from 'src/config/constants'

async function main() {
  logger.info('seeding started')

  const tokenTypes = await db.select().from(schema.tokenType)
  if (tokenTypes.length === 0) {
    for (const type in tokenTypesEnum) {
      await db.insert(schema.tokenType).values({
        id: v4(),
        key: type
      })
    }
  }

  const categories = await db.select().from(schema.category)
  if (categories.length === 0) {
    for (const category in categoriesEnum) {
      await db.insert(schema.category).values({
        id: v4(),
        key: category
      })
    }
  }

  const donationStatus = await db.select().from(schema.donationStatus)
  if (donationStatus.length === 0) {
    for (const status in donationStatusEnum) {
      await db.insert(schema.donationStatus).values({
        id: v4(),
        key: status
      })
    }
  }

  const requestStatus = await db.select().from(schema.requestStatus)
  if (requestStatus.length === 0) {
    for (const status in requestStatusEnum) {
      await db.insert(schema.requestStatus).values({
        id: v4(),
        key: status
      })
    }
  }
}

main()
  .then(() => {
    logger.info('seeding finished')
    process.exit(0)
  })
  .catch((error) => {
    logger.error(error)
    process.exit(1)
  })