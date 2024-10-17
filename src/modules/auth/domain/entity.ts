import { BeneficiaryEntity } from 'src/modules/beneficiary/domain/entity'
import { DonarEntity } from 'src/modules/donar/domain/entity'

/**
 * Represents a Beneficiary Auth entity.
 * 
 * This interface defines the structure of a Beneficiary Auth object in the domain layer.
 * It includes basic auth information such as `accessToken`, `refreshToken`, and `beneficiary`.
 * 
 * @interface BeneficiaryAuthEntity
 */
export interface BeneficiaryAuthEntity {
  /**
   * The access token of the beneficiary.
   * @type {string}
  */
  accessToken: string

  /**
   * The refresh token of the beneficiary.
   * @type {string}
  */
  refreshToken: string

  /**
   * The information of the beneficiary.
   * @type {UserEntity}
  */
  beneficiary: BeneficiaryEntity
}

/**
 * Represents a Donar Auth entity.
 * 
 * This interface defines the structure of a Donar Auth object in the domain layer.
 * It includes basic auth information such as `accessToken`, `refreshToken`, and `donar`.
 * 
 * @interface DonarAuthEntity
 */
export interface DonarAuthEntity {
  /**
   * The access token of the donar.
   * @type {string}
  */
  accessToken: string

  /**
   * The refresh token of the donar.
   * @type {string}
  */
  refreshToken: string

  /**
   * The information of the donar.
   * @type {DonarEntity}
  */
  donar: DonarEntity
}