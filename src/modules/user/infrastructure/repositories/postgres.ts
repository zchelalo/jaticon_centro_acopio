import { UserEntity } from '../../domain/entity'
import { UserRepository } from '../../domain/repository'
import { db } from 'src/data/drizzle/config/orm'
import { user } from 'src/data/drizzle/schemas'
import { count, desc, eq } from 'drizzle-orm'
import { BadRequestError, ConflictError, DatabaseError, NotFoundError } from 'src/helpers/errors/custom_error'

/**
 * PostgresRepository class.
 * 
 * This class implements the UserRepository interface to provide methods for interacting with the PostgreSQL database.
 * 
 * @implements {UserRepository}
*/
export class PostgresRepository implements UserRepository {
  /**
   * Retrieves a user by their ID from the database.
   * 
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<UserEntity>} A promise that resolves with the user entity.
   * @throws {NotFoundError} If the user with the given ID does not exist.
  */
  async getUserById(id: string): Promise<UserEntity> {
    const userObtained = await db
      .select({
        id: user.id,
        name: user.name,
        lastName1: user.lastName1,
        lastName2: user.lastName2,
        email: user.email
      })
      .from(user)
      .where(eq(user.id, id))
      .limit(1)

    if (userObtained.length === 0) {
      throw new NotFoundError(`user with id '${id}'`)
    }
    return {
      id: userObtained[0].id,
      name: userObtained[0].name,
      lastName1: userObtained[0].lastName1,
      lastName2: userObtained[0].lastName2 || undefined,
      email: userObtained[0].email
    }
  }

  /**
   * Retrieves a user by their email from the database.
   * 
   * @param {string} email - The email of the user to retrieve.
   * @returns {Promise<UserEntity>} A promise that resolves with the user entity.
   * @throws {NotFoundError} If the user with the given email does not exist.
  */
  async getUserByEmail(email: string): Promise<UserEntity> {
    const userObtained = await db
      .select({
        id: user.id,
        name: user.name,
        lastName1: user.lastName1,
        lastName2: user.lastName2,
        email: user.email,
        password: user.password
      })
      .from(user)
      .where(eq(user.email, email))
      .limit(1)

    if (userObtained.length === 0) {
      throw new NotFoundError(`user with email '${email}'`)
    }
    return {
      id: userObtained[0].id,
      name: userObtained[0].name,
      lastName1: userObtained[0].lastName1,
      lastName2: userObtained[0].lastName2 || undefined,
      email: userObtained[0].email,
      password: userObtained[0].password
    }
  }

  /**
   * Retrieves a list of users from the database with pagination.
   * 
   * @param {number} offset - The number of users to skip before starting to collect the result set.
   * @param {number} limit - The number of users to return.
   * @returns {Promise<UserEntity[]>} A promise that resolves with an array of user entities.
   * @throws {NotFoundError} If no users are found.
  */
  async getUsers(offset: number, limit: number): Promise<UserEntity[]> {
    const usersObtained = await db
      .select({
        id: user.id,
        name: user.name,
        lastName1: user.lastName1,
        lastName2: user.lastName2,
        email: user.email
      })
      .from(user)
      .offset(offset)
      .limit(limit)
      .orderBy(desc(user.createdAt))

    if (usersObtained.length === 0) {
      throw new NotFoundError('users')
    }
    return usersObtained.map(user => ({
      id: user.id,
      name: user.name,
      lastName1: user.lastName1,
      lastName2: user.lastName2 || undefined,
      email: user.email
    }))
  }

  /**
   * Counts the number of users in the database.
   * 
   * @returns {Promise<number>} A promise that resolves with the number of users.
  */
  async count(): Promise<number> {
    const usersCount = await db
      .select({
        count: count()
      })
      .from(user)

    return usersCount[0].count
  }

  /**
   * Creates a new user in the database.
   * 
   * @param {UserEntity} userData - The user entity to be created.
   * @returns {Promise<UserEntity>} A promise that resolves with the created user entity.
   * @throws {ConflictError} If a user with the given email already exists.
   * @throws {DatabaseError} If the user could not be created.
   * @throws {BadRequestError} If the password is missing.
  */
  async createUser(userData: UserEntity): Promise<UserEntity> {
    const userObtained = await db
      .select({
        id: user.id
      })
      .from(user)
      .where(eq(user.email, userData.email))
      .limit(1)

    if (userObtained.length > 0) {
      throw new ConflictError(`email already exists`)
    }

    if (userData.password) {
      const userCreated = await db
        .insert(user)
        .values({
          id: userData.id,
          name: userData.name,
          lastName1: userData.lastName1,
          lastName2: userData.lastName2,
          email: userData.email,
          password: userData.password
        })
        .returning({
          id: user.id,
          name: user.name,
          lastName1: user.lastName1,
          lastName2: user.lastName2,
          email: user.email
        })

      return {
        id: userCreated[0].id,
        name: userCreated[0].name,
        lastName1: userCreated[0].lastName1,
        lastName2: userCreated[0].lastName2 || undefined,
        email: userCreated[0].email
      }
    }

    throw new BadRequestError('password is required')
  }
}