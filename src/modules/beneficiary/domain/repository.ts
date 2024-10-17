import { BeneficiaryEntity } from './entity'

/**
 * BeneficiaryRepository interface.
 * 
 * This interface defines the contract for a repository that manages the persistence and retrieval of BeneficiaryEntity objects.
 * 
 * @interface BeneficiaryRepository
*/
export interface BeneficiaryRepository {
  /**
   * Retrieves a beneficiary by their unique identifier (UUID).
   * 
   * @param {string} uuid - The unique identifier of the beneficiary.
   * @returns {Promise<BeneficiaryEntity>} A promise that resolves to the BeneficiaryEntity.
  */
  getBeneficiaryById(uuid: string): Promise<BeneficiaryEntity>

  /**
   * Retrieves a beneficiary by their email address.
   * 
   * @param {string} email - The email address of the beneficiary.
   * @returns {Promise<BeneficiaryEntity>} A promise that resolves to the BeneficiaryEntity.
  */
  getBeneficiaryByEmail(email: string): Promise<BeneficiaryEntity>

  /**
   * Creates a new beneficiary.
   * 
   * @param {BeneficiaryEntity} beneficiary - The beneficiary entity to be created.
   * @returns {Promise<BeneficiaryEntity>} A promise that resolves to the newly created BeneficiaryEntity.
  */
  createBeneficiary(beneficiary: BeneficiaryEntity): Promise<BeneficiaryEntity>
}