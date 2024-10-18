import { DonationEntity } from './entity'

/**
 * DonationRepository interface.
 * 
 * This interface defines the contract for a repository that manages the persistence and retrieval of DonationEntity objects.
 * 
 * @interface DonationRepository
*/
export interface DonationRepository {
  /**
   * Retrieves a donation by their unique identifier (UUID).
   * 
   * @param {string} uuid - The unique identifier of the donation.
   * @returns {Promise<DonationEntity>} A promise that resolves to the DonationEntity.
  */
  getDonationById(uuid: string): Promise<DonationEntity>

  /**
   * Retrieves a donar by their email address.
   * 
   * @param {number} offset - The offset of the list.
   * @param {number} limit - The limit of the list.
   * @returns {Promise<DonationEntity>} A promise that resolves to a DonationEntity list.
  */
  listDonations(offset: number, limit: number, donationStatusId: string, name?: string, categoryId?: string, collectionCenterId?: string): Promise<DonationEntity[]>

  countDonations(donationStatusId: string, name?: string, categoryId?: string, collectionCenterId?: string): Promise<number>

  /**
   * Creates a new donar.
   * 
   * @param {DonationEntity} donation - The donation entity to be created.
   * @returns {Promise<DonationEntity>} A promise that resolves to the newly created DonationEntity.
  */
  createDonation(donation: DonationEntity): Promise<DonationEntity>
}