import { donationStatus } from 'src/config/constants'

/**
 * Represents a Donation Status entity.
 * 
 * This interface defines the structure of a Donation Status object in the domain layer.
 * It includes information such as `id`, and `key`.
 * 
 * @interface DonationStatusEntity
 */
export interface DonationStatusEntity {
  /**
   * The id of the donation status.
  */
  id: string

  /**
   * The key of the donation status.
  */
  key: donationStatus
}