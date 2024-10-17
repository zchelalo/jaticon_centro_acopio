import { UserEntity } from '../../user/domain/entity'

/**
 * Represents a Donar entity.
 * 
 * This interface defines the structure of an Donar object in the domain layer.
 * It includes information such as `id`, and `user`.
 * 
 * @interface DonarEntity
 */
export interface DonarEntity {
  /**
   * The id of the donar.
   * @type {string}
  */
  id: string

  /**
   * The information of the user.
   * @type {UserEntity}
  */
  user: UserEntity
}