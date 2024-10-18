import { CollectionCenterEntity } from './entity'

/**
 * CollectionCenterRepository interface.
 * 
 * This interface defines the contract for a repository that manages the persistence and retrieval of CollectionCenterEntity objects.
 * 
 * @interface CollectionCenterRepository
*/
export interface CollectionCenterRepository {
  /**
   * Retrieves a collection center by their unique identifier (UUID).
   * 
   * @param {string} uuid - The unique identifier of the collection center.
   * @returns {Promise<CollectionCenterEntity>} A promise that resolves to the CollectionCenterEntity.
  */
  getCollectionCenterById(uuid: string): Promise<CollectionCenterEntity>

  /**
   * Creates a new collection center.
   * 
   * @param {CollectionCenterEntity} collectionCenter - The collection center entity to be created.
   * @returns {Promise<CollectionCenterEntity>} A promise that resolves to the CollectionCenterEntity.
   */
  createCollecionCenter(collectionCenter: CollectionCenterEntity): Promise<CollectionCenterEntity>
}