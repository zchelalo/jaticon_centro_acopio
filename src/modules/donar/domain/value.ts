import { DonarEntity } from 'src/modules/donar/domain/entity'
import { UserEntity } from 'src/modules/user/domain/entity'

import { v4 } from 'uuid'

/**
 * DonarValue class.
 * 
 * This class implements the DonarEntity interface and represents a value object for a Donar object.
 * 
 * @implements {DonarEntity}
 * @example
 * ```ts
 * const user = new UserValue('name', 'lastName1', 'lastName2', 'email', 'password')
 * const donar = new DonarValue(user)
 * ```
*/
export class DonarValue implements DonarEntity {
  /**
   * The id of the donar.
   * @type {string}
  */
  readonly id: string

  /**
   * The information of the user.
   * @type {UserEntity}
  */
  readonly user: UserEntity

  /**
   * Creates a new DonarValue instance.
   * 
   * @param {UserEntity} user - The information of the user.
  */
  constructor(user: UserEntity) {
    this.id = v4()
    this.user = user
  }
}