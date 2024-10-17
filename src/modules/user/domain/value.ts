import { v4 as uuid } from 'uuid'
import { UserEntity } from './entity'

/**
 * UserValue class.
 * 
 * This class implements the UserEntity interface and represents a value object for a User. It automatically generates a UUID for the user upon creation.
 * 
 * @implements {UserEntity}
*/
export class UserValue implements UserEntity {
  /**
   * The unique identifier of the user.
   * @type {string}
  */
  readonly id: string

  /**
   * The name of the user.
   * @type {string}
  */
  readonly name: string

  /**
   * The first last name of the user.
   * @type {string}
  */
  readonly lastName1: string

  /**
   * The second last name of the user.
   * @type {string}
  */
  readonly lastName2?: string

  /**
   * The email address of the user.
   * @type {string}
  */
  readonly email: string

  /**
   * The password of the user, stored as a hashed string.
   * @type {string}
  */
  readonly password: string

  /**
   * Creates a new UserValue instance.
   * 
   * @param {string} name - The name of the user.
   * @param {string} lastName1 - The first last name of the user.
   * @param {string} lastName2 - The second last name of the user.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
  */
  constructor(name: string, lastName1: string, email: string, password: string, lastName2?: string) {
    this.id = uuid()
    this.name = name
    this.lastName1 = lastName1
    this.lastName2 = lastName2
    this.email = email
    this.password = password
  }
}