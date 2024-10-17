import { UserEntity } from '../../user/domain/entity'

/**
 * Represents a Beneficiary entity.
 * 
 * This interface defines the structure of an Beneficiary object in the domain layer.
 * It includes information such as `id`, and `user`.
 * 
 * @interface BeneficiaryEntity
 */
export interface BeneficiaryEntity {
  /**
   * The id of the beneficiary.
   * @type {string}
  */
  id: string

  /**
   * The information of the user.
   * @type {UserEntity}
  */
  user: UserEntity
}