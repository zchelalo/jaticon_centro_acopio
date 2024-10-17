import { DTOUserResponse } from 'src/modules/user/application/dtos/user_response'
import { DonarEntity } from '../../domain/entity'

/**
 * Data Transfer Object for User Response.
 * 
 * This class is responsible for transferring user data between different parts of the application or across application boundaries.
*/
export class DTODonarResponse {
  /**
   * The unique identifier of the user.
  */
  id: string

  /**
   * The information of the user.
   */
  user: DTOUserResponse

  /**
   * Creates an instance of DTOUserResponse.
   * 
   * @param {UserValue} user - The user value object from the domain layer.
  */
  constructor({ id, user }: DonarEntity) {
    this.id = id
    this.user = user
  }
}