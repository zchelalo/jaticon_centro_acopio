import { CollectionCenterEntity } from '../../domain/entity'
import { CollectionCenterRepository } from '../../domain/repository'
import { db } from 'src/data/drizzle/config/orm'
import { collectionCenter } from 'src/data/drizzle/schemas'
import { eq, getTableColumns } from 'drizzle-orm'
import { NotFoundError } from 'src/helpers/errors/custom_error'

/**
 * PostgresRepository class.
 * 
 * This class implements the CollectionCenterRepository interface to provide methods for interacting with the PostgreSQL database.
 * 
 * @implements {CollectionCenterRepository}
*/
export class PostgresRepository implements CollectionCenterRepository {
  async getCollectionCenterById(uuid: string): Promise<CollectionCenterEntity> {
    const collectionCenterObtained = await db
      .select(getTableColumns(collectionCenter))
      .from(collectionCenter)
      .where(eq(collectionCenter.id, uuid))
      .limit(1)

    if (!collectionCenterObtained.length) {
      throw new NotFoundError('category')
    }

    return collectionCenterObtained[0]
  }

  async createCollecionCenter(collectionCenterObtained: CollectionCenterEntity): Promise<CollectionCenterEntity> {
    const [createdCollectionCenter] = await db
      .insert(collectionCenter)
      .values(collectionCenterObtained)
      .returning(getTableColumns(collectionCenter))

    return createdCollectionCenter
  }
}