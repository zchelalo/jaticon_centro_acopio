import { DonationStatusEntity } from '../../domain/entity'
import { DonationStatusRepository } from '../../domain/repository'
import { db } from 'src/data/drizzle/config/orm'
import { donationStatus } from 'src/data/drizzle/schemas'
import { eq } from 'drizzle-orm'
import { donationStatus as donationStatusEnum } from 'src/config/constants'
import { NotFoundError } from 'src/helpers/errors/custom_error'

/**
 * PostgresRepository class.
 * 
 * This class implements the DonationStatusRepository interface to provide methods for interacting with the PostgreSQL database.
 * 
 * @implements {DonationStatusRepository}
*/
export class PostgresRepository implements DonationStatusRepository {
  async getDonationStatusById(uuid: string): Promise<DonationStatusEntity> {
    const donationStatusObtained = await db
      .select({
        id: donationStatus.id,
        key: donationStatus.key
      })
      .from(donationStatus)
      .where(eq(donationStatus.id, uuid))
      .limit(1)

    if (!donationStatusObtained.length) {
      throw new NotFoundError('donation status')
    }

    return {
      id: donationStatusObtained[0].id,
      key: donationStatusObtained[0].key as donationStatusEnum
    }
  }

  async getDonationStatusByKey(key: donationStatusEnum): Promise<DonationStatusEntity> {
    const donationStatusObtained = await db
      .select({
        id: donationStatus.id,
        key: donationStatus.key
      })
      .from(donationStatus)
      .where(eq(donationStatus.key, key))
      .limit(1)

    if (!donationStatusObtained.length) {
      throw new NotFoundError('donation status')
    }

    return {
      id: donationStatusObtained[0].id,
      key: donationStatusObtained[0].key as donationStatusEnum
    }
  }
}