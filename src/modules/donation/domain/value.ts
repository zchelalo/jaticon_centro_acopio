import { UserEntity } from 'src/modules/user/domain/entity'

import { v4 } from 'uuid'
import { DonationEntity } from './entity'
import { CategoryEntity } from 'src/modules/category/domain/entity'
import { DonarEntity } from 'src/modules/donar/domain/entity'
import { CollectionCenterEntity } from 'src/modules/collection_center/domain/entity'
import { DonationStatusEntity } from 'src/modules/donation_status/domain/entity'

/**
 * DonarValue class.
 * 
 * This class implements the DonationEntity interface and represents a value object for a Donation object.
 * 
 * @implements {DonationEntity}
 * @example
 * ```ts
 * const user = new UserValue('name', 'lastName1', 'lastName2', 'email', 'password')
 * const donar = new DonarValue(user)
 * ```
*/
export class DonationValue implements DonationEntity {
  /**
   * The id of the donar.
  */
  readonly id: string

  /**
   * The information of the category.
  */
  readonly category: CategoryEntity

  /**
   * The information of the donar.
  */
  readonly donar: DonarEntity

  /**
   * The information of the collection center.
  */
  readonly collectionCenter: CollectionCenterEntity

  /**
   * The information of the donation status.
  */
  readonly donationStatus: DonationStatusEntity

  /**
   * The name of the donation.
  */
  readonly name: string

  /**
   * The description of the donation.
  */
  readonly description: string

  /**
   * The image URL of the donation.
  */
  readonly imageUrl: string

  /**
   * Creates a new DonarValue instance.
   * 
   * @param {DonationEntity} donation - The information of the donation.
  */
  constructor(category: CategoryEntity, donar: DonarEntity, collectionCenter: CollectionCenterEntity, donationStatus: DonationStatusEntity, name: string, description: string, imageUrl: string) {
    this.id = v4()
    this.category = category
    this.donar = donar
    this.collectionCenter = collectionCenter
    this.donationStatus = donationStatus
    this.name = name
    this.description = description
    this.imageUrl = imageUrl
  }
}