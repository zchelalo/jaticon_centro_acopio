import { DonarEntity } from '../../domain/entity'
import { DonarRepository } from '../../domain/repository'
import { db } from 'src/data/drizzle/config/orm'
import { donar, user } from 'src/data/drizzle/schemas'
import { eq } from 'drizzle-orm'
import { BadRequestError, ConflictError, NotFoundError } from 'src/helpers/errors/custom_error'

/**
 * PostgresRepository class.
 * 
 * This class implements the DonarRepository interface to provide methods for interacting with the PostgreSQL database.
 * 
 * @implements {DonarRepository}
*/
export class PostgresRepository implements DonarRepository {
  /**
   * Retrieves a donar by their ID from the database.
   * 
   * @param {string} id - The ID of the donar to retrieve.
   * @returns {Promise<DonarEntity>} A promise that resolves with the donar entity.
   * @throws {NotFoundError} If the donar with the given ID does not exist.
  */
  async getDonarById(id: string): Promise<DonarEntity> {
    const donarObtained = await db
      .select({
        id: donar.id,
        user: {
          id: user.id,
          name: user.name,
          lastName1: user.lastName1,
          lastName2: user.lastName2,
          email: user.email
        }
      })
      .from(donar)
      .innerJoin(user, eq(donar.userId, user.id))
      .where(eq(donar.id, id))
      .limit(1)

    if (donarObtained.length === 0) {
      throw new NotFoundError(`donar with id '${id}'`)
    }
    return {
      id: donarObtained[0].id,
      user: {
        id: donarObtained[0].user.id,
        name: donarObtained[0].user.name,
        lastName1: donarObtained[0].user.lastName1,
        lastName2: donarObtained[0].user.lastName2 || undefined,
        email: donarObtained[0].user.email
      }
    }
  }

  /**
   * Retrieves a donar by their email from the database.
   * 
   * @param {string} email - The email of the donar to retrieve.
   * @returns {Promise<DonarEntity>} A promise that resolves with the donar entity.
   * @throws {NotFoundError} If the donar with the given email does not exist.
  */
  async getDonarByEmail(email: string): Promise<DonarEntity> {
    const donarObtained = await db
      .select({
        id: donar.id,
        user: {
          id: user.id,
          name: user.name,
          lastName1: user.lastName1,
          lastName2: user.lastName2,
          email: user.email,
          password: user.password
        }
      })
      .from(donar)
      .innerJoin(user, eq(donar.userId, user.id))
      .where(eq(user.email, email))
      .limit(1)

    if (donarObtained.length === 0) {
      throw new NotFoundError(`donar with email '${email}'`)
    }
    return {
      id: donarObtained[0].id,
      user: {
        id: donarObtained[0].user.id,
        name: donarObtained[0].user.name,
        lastName1: donarObtained[0].user.lastName1,
        lastName2: donarObtained[0].user.lastName2 || undefined,
        email: donarObtained[0].user.email,
        password: donarObtained[0].user.password
      }
    }
  }

  /**
   * Creates a new donar in the database.
   * 
   * @param {DonarEntity} donarData - The donar entity to be created.
   * @returns {Promise<DonarEntity>} A promise that resolves with the created donar entity.
   * @throws {ConflictError} If a donar with the given email already exists.
   * @throws {DatabaseError} If the donar could not be created.
   * @throws {BadRequestError} If the password is missing.
  */
  async createDonar(donarData: DonarEntity): Promise<DonarEntity> {
    const donarObtained = await db
      .select({
        id: donar.id
      })
      .from(donar)
      .innerJoin(user, eq(donar.userId, user.id))
      .where(eq(user.email, donarData.user.email))
      .limit(1)

    if (donarObtained.length > 0) {
      throw new ConflictError(`email already exists`)
    }

    if (donarData.user.password) {
      return await db.transaction(async tx  => {
        const userCreated = await tx
          .insert(user)
          .values({
            id: donarData.user.id,
            name: donarData.user.name,
            lastName1: donarData.user.lastName1,
            lastName2: donarData.user.lastName2,
            email: donarData.user.email,
            password: donarData.user.password || ''
          })
          .returning({
            id: user.id,
            name: user.name,
            lastName1: user.lastName1,
            lastName2: user.lastName2,
            email: user.email
          })

        const donarCreated = await tx
          .insert(donar)
          .values({
            id: donarData.id,
            userId: userCreated[0].id
          })
          .returning({
            id: donar.id
          })

        return {
          id: donarCreated[0].id,
          user: {
            id: userCreated[0].id,
            name: userCreated[0].name,
            lastName1: userCreated[0].lastName1,
            lastName2: userCreated[0].lastName2 || undefined,
            email: userCreated[0].email
          }
        }
      })
    }

    throw new BadRequestError('password is required')
  }
}