import { CategoryEntity } from '../../domain/entity'
import { CategoryRepository } from '../../domain/repository'
import { db } from 'src/data/drizzle/config/orm'
import { category } from 'src/data/drizzle/schemas'
import { eq } from 'drizzle-orm'
import { categories as categoriesEnum } from 'src/config/constants'
import { NotFoundError } from 'src/helpers/errors/custom_error'

/**
 * PostgresRepository class.
 * 
 * This class implements the CategoryRepository interface to provide methods for interacting with the PostgreSQL database.
 * 
 * @implements {CategoryRepository}
*/
export class PostgresRepository implements CategoryRepository {
  async getCategoryById(uuid: string): Promise<CategoryEntity> {
    const categoryObtained = await db
      .select({
        id: category.id,
        key: category.key
      })
      .from(category)
      .where(eq(category.id, uuid))
      .limit(1)

    if (!categoryObtained.length) {
      throw new NotFoundError('category')
    }

    return {
      id: categoryObtained[0].id,
      key: categoryObtained[0].key as categoriesEnum
    }
  }

  async getCategoryByKey(key: categoriesEnum): Promise<CategoryEntity> {
    const categoryObtained = await db
      .select({
        id: category.id,
        key: category.key
      })
      .from(category)
      .where(eq(category.key, key))
      .limit(1)

    if (!categoryObtained.length) {
      throw new NotFoundError('category')
    }

    return {
      id: categoryObtained[0].id,
      key: categoryObtained[0].key as categoriesEnum
    }
  }
}