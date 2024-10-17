import { DonarEntity } from './entity'

/**
 * DonarRepository interface.
 * 
 * This interface defines the contract for a repository that manages the persistence and retrieval of DonarEntity objects.
 * 
 * @interface DonarRepository
*/
export interface DonarRepository {
  /**
   * Retrieves a donar by their unique identifier (UUID).
   * 
   * @param {string} uuid - The unique identifier of the donar.
   * @returns {Promise<DonarEntity>} A promise that resolves to the DonarEntity.
  */
  getDonarById(uuid: string): Promise<DonarEntity>

  /**
   * Retrieves a donar by their email address.
   * 
   * @param {string} email - The email address of the donar.
   * @returns {Promise<DonarEntity>} A promise that resolves to the DonarEntity.
  */
  getDonarByEmail(email: string): Promise<DonarEntity>

  /**
   * Creates a new donar.
   * 
   * @param {DonarEntity} donar - The donar entity to be created.
   * @returns {Promise<DonarEntity>} A promise that resolves to the newly created DonarEntity.
  */
  createDonar(donar: DonarEntity): Promise<DonarEntity>
}