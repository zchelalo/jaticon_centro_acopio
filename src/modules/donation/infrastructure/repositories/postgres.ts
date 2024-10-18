import { DonationEntity } from '../../domain/entity'
import { DonationRepository } from '../../domain/repository'
import { db } from 'src/data/drizzle/config/orm'
import { category, collectionCenter, donar, donation, donationStatus, user } from 'src/data/drizzle/schemas'
import { count, desc, eq, getTableColumns, like } from 'drizzle-orm'
import { donationStatus as donationStatusEnum } from 'src/config/constants'
import { NotFoundError } from 'src/helpers/errors/custom_error'

/**
 * PostgresRepository class.
 * 
 * This class implements the DonationRepository interface to provide methods for interacting with the PostgreSQL database.
 * 
 * @implements {DonationRepository}
*/
export class PostgresRepository implements DonationRepository {
  async getDonationById(uuid: string): Promise<DonationEntity> {
    const donationObtained = await db
      .select({
        id: donation.id,
        category: getTableColumns(category),
        donarId: donar.id,
        donarUserId: user.id,
        donarName: user.name,
        donarLastName1: user.lastName1,
        donarLastName2: user.lastName2,
        donarEmail: user.email,
        collectionCenter: getTableColumns(collectionCenter),
        donationStatus: getTableColumns(donationStatus),
        name: donation.name,
        description: donation.description,
        imageUrl: donation.imageUrl
      })
      .from(donation)
      .innerJoin(category, eq(donation.categoryId, category.id))
      .innerJoin(donar, eq(donation.donarId, donar.id))
      .innerJoin(user, eq(donar.userId, user.id))
      .innerJoin(collectionCenter, eq(donation.collectionCenterId, collectionCenter.id))
      .innerJoin(donationStatus, eq(donation.donationStatusId, donationStatus.id))
      .where(eq(donation.id, uuid))
      .limit(1)

    if (!donationObtained.length) {
      throw new NotFoundError('donation')
    }

    return {
      id: donationObtained[0].id,
      category: {
        id: donationObtained[0].category.id,
        key: donationObtained[0].category.key
      },
      donar: {
        id: donationObtained[0].donarId,
        user: {
          id: donationObtained[0].donarUserId,
          name: donationObtained[0].donarName,
          lastName1: donationObtained[0].donarLastName1,
          lastName2: donationObtained[0].donarLastName2 || undefined,
          email: donationObtained[0].donarEmail
        }
      },
      collectionCenter: {
        id: donationObtained[0].collectionCenter.id,
        key: donationObtained[0].collectionCenter.key,
        latitude: donationObtained[0].collectionCenter.latitude,
        longitude: donationObtained[0].collectionCenter.longitude,
        observation: donationObtained[0].collectionCenter.observation
      },
      donationStatus: {
        id: donationObtained[0].donationStatus.id,
        key: donationObtained[0].donationStatus.key as donationStatusEnum
      },
      name: donationObtained[0].name,
      description: donationObtained[0].description,
      imageUrl: donationObtained[0].imageUrl
    }
  }

  async listDonations(offset: number, limit: number, name?: string, categoryId?: string, collectionCenterId?: string): Promise<DonationEntity[]> {
    const donationsObtained = db
      .select({
        id: donation.id,
        category: getTableColumns(category),
        donarId: donar.id,
        donarUserId: user.id,
        donarName: user.name,
        donarLastName1: user.lastName1,
        donarLastName2: user.lastName2,
        donarEmail: user.email,
        collectionCenter: getTableColumns(collectionCenter),
        donationStatus: getTableColumns(donationStatus),
        name: donation.name,
        description: donation.description,
        imageUrl: donation.imageUrl
      })
      .from(donation)
      .innerJoin(category, eq(donation.categoryId, category.id))
      .innerJoin(donar, eq(donation.donarId, donar.id))
      .innerJoin(user, eq(donar.userId, user.id))
      .innerJoin(collectionCenter, eq(donation.collectionCenterId, collectionCenter.id))
      .innerJoin(donationStatus, eq(donation.donationStatusId, donationStatus.id))

    if (name) {
      donationsObtained.where(like(donation.name, `%${name}%`))
    }

    if (categoryId) {
      donationsObtained.where(eq(donation.categoryId, categoryId))
    }

    if (collectionCenterId) {
      donationsObtained.where(eq(donation.collectionCenterId, collectionCenterId))
    }

    const donations = await donationsObtained.offset(offset).limit(limit).orderBy(desc(donation.createdAt))

    return donations.map(donation => ({
      id: donation.id,
      category: {
        id: donation.category.id,
        key: donation.category.key
      },
      donar: {
        id: donation.donarId,
        user: {
          id: donation.donarUserId,
          name: donation.donarName,
          lastName1: donation.donarLastName1,
          lastName2: donation.donarLastName2 || undefined,
          email: donation.donarEmail
        }
      },
      collectionCenter: {
        id: donation.collectionCenter.id,
        key: donation.collectionCenter.key,
        latitude: donation.collectionCenter.latitude,
        longitude: donation.collectionCenter.longitude,
        observation: donation.collectionCenter.observation
      },
      donationStatus: {
        id: donation.donationStatus.id,
        key: donation.donationStatus.key as donationStatusEnum
      },
      name: donation.name,
      description: donation.description,
      imageUrl: donation.imageUrl
    }))
  }

  async countDonations(name?: string, categoryId?: string, collectionCenterId?: string): Promise<number> {
    const countDonations = db
      .select({
        count: count()
      })
      .from(donation)
      .innerJoin(category, eq(donation.categoryId, category.id))
      .innerJoin(donar, eq(donation.donarId, donar.id))
      .innerJoin(user, eq(donar.userId, user.id))
      .innerJoin(collectionCenter, eq(donation.collectionCenterId, collectionCenter.id))
      .innerJoin(donationStatus, eq(donation.donationStatusId, donationStatus.id))

    if (name) {
      countDonations.where(like(donation.name, `%${name}%`))
    }

    if (categoryId) {
      countDonations.where(eq(donation.categoryId, categoryId))
    }

    if (collectionCenterId) {
      countDonations.where(eq(donation.collectionCenterId, collectionCenterId))
    }

    const countResult = await countDonations
    return countResult[0].count
  }

  async createDonation(donationObtained: DonationEntity): Promise<DonationEntity> {
    await db
      .insert(donation)
      .values({
        id: donationObtained.id,
        categoryId: donationObtained.category.id,
        donarId: donationObtained.donar.id,
        collectionCenterId: donationObtained.collectionCenter.id,
        donationStatusId: donationObtained.donationStatus.id,
        name: donationObtained.name,
        description: donationObtained.description,
        imageUrl: donationObtained.imageUrl
      })

    return donationObtained
  }
}