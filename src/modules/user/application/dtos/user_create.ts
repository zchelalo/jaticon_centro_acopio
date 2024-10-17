import { UserEntity } from '../../domain/entity'

/**
 * Data Transfer Object for Create a User.
 * 
 * This class is responsible for transferring user data between different parts of the application or across application boundaries.
*/
export class DTOUserCreate {
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
   * The password of the user.
  */
  password: string

  /**
   * Creates an instance of DTOUserCreate.
   * 
   * @param {UserValue} user - The user value object from the domain layer.
  */
  constructor({ name, lastName1, lastName2, email, password }: UserEntity) {
    this.name = name
    this.lastName1 = lastName1
    this.lastName2 = lastName2
    this.email = email
    this.password = password || ''
  }
}