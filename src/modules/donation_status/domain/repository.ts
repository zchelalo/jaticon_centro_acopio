import { donationStatus } from 'src/config/constants'
import { DonationStatusEntity } from './entity'

/**
 * DonationStatusRepository interface.
 * 
 * This interface defines the contract for a repository that manages the persistence and retrieval of DonationStatusEntity objects.
 * 
 * @interface DonationStatusRepository
*/
export interface DonationStatusRepository {
  /**
   * Retrieves a donation status by their unique identifier (UUID).
   * 
   * @param {string} uuid - The unique identifier of the donation status.
   * @returns {Promise<DonationStatusEntity>} A promise that resolves to the DonationStatusEntity.
  */
  getDonationStatusById(uuid: string): Promise<DonationStatusEntity>

  /**
   * Retrieves a donation status by their unique key.
   * 
   * @param {donationStatus} key - The unique key of the donation status.
   * @returns {Promise<DonationStatusEntity>} A promise that resolves to the DonationStatusEntity.
   */
  getDonationStatusByKey(key: donationStatus): Promise<DonationStatusEntity>
}