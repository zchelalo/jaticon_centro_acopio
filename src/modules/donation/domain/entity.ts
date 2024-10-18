import { CategoryEntity } from 'src/modules/category/domain/entity'
import { CollectionCenterEntity } from 'src/modules/collection_center/domain/entity'
import { DonarEntity } from 'src/modules/donar/domain/entity'
import { DonationStatusEntity } from 'src/modules/donation_status/domain/entity'

/**
 * Represents a Donation entity.
 * 
 * This interface defines the structure of a Donation object in the domain layer.
 * It includes information such as `id`, 'category', and `donar`.
 * 
 * @interface DonationEntity
 */
export interface DonationEntity {
  /**
   * The id of the donar.
  */
  id: string

  /**
   * The category of the donation.
   */
  category: CategoryEntity

  /**
   * The donar of the donation.
   */
  donar: DonarEntity

  /**
   * The collection center of the donation.
   */
  collectionCenter: CollectionCenterEntity

  /**
   * The donation status of the donation.
   */
  donationStatus: DonationStatusEntity

  /**
   * The name of the donation.
   */
  name: string

  /**
   * The description of the donation.
   */
  description: string

  /**
   * The image URL of the donation.
   */
  imageUrl: string
}