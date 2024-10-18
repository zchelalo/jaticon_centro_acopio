import { categories } from 'src/config/constants'
import { CategoryEntity } from './entity'

/**
 * CategoryRepository interface.
 * 
 * This interface defines the contract for a repository that manages the persistence and retrieval of CategoryEntity objects.
 * 
 * @interface CategoryRepository
*/
export interface CategoryRepository {
  /**
   * Retrieves a category by their unique identifier (UUID).
   * 
   * @param {string} uuid - The unique identifier of the category.
   * @returns {Promise<CategoryEntity>} A promise that resolves to the CategoryEntity.
  */
  getCategoryById(uuid: string): Promise<CategoryEntity>

  /**
   * Retrieves a category by their unique key.
   * 
   * @param {categories} key - The unique key of the category.
   * @returns {Promise<CategoryEntity>} A promise that resolves to the CategoryEntity.
   */
  getCategoryByKey(key: categories): Promise<CategoryEntity>
}