import { BeneficiaryEntity } from 'src/modules/beneficiary/domain/entity'
import { UserEntity } from 'src/modules/user/domain/entity'

import { v4 } from 'uuid'

/**
 * BeneficiaryValue class.
 * 
 * This class implements the BeneficiaryEntity interface and represents a value object for a Beneficiary object.
 * 
 * @implements {BeneficiaryEntity}
 * @example
 * ```ts
 * const user = new UserValue('name', 'lastName1', 'lastName2', 'email', 'password')
 * const beneficiary = new BeneficiaryValue(user)
 * ```
*/
export class BeneficiaryValue implements BeneficiaryEntity {
  /**
   * The id of the beneficiary.
   * @type {string}
  */
  readonly id: string

  /**
   * The information of the user.
   * @type {UserEntity}
  */
  readonly user: UserEntity

  /**
   * Creates a new BeneficiaryValue instance.
   * 
   * @param {UserEntity} user - The information of the user.
  */
  constructor(user: UserEntity) {
    this.id = v4()
    this.user = user
  }
}