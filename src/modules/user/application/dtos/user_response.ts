import { UserEntity } from '../../domain/entity'

/**
 * Data Transfer Object for User Response.
 * 
 * This class is responsible for transferring user data between different parts of the application or across application boundaries.
*/
export class DTOUserResponse {
  /**
   * The unique identifier of the user.
  */
  id: string

  /**
   * The name of the user.
  */
  name: string

  /**
   * The first last name of the user.
  */
  lastName1: string

  /**
   * The second last name of the user.
  */
  lastName2?: string

  /**
   * The email address of the user.
  */
  email: string

  /**
   * Creates an instance of DTOUserResponse.
   * 
   * @param {UserValue} user - The user value object from the domain layer.
  */
  constructor({ id, name, lastName1, lastName2, email }: UserEntity) {
    this.id = id
    this.name = name
    this.lastName1 = lastName1
    this.lastName2 = lastName2
    this.email = email
  }
}