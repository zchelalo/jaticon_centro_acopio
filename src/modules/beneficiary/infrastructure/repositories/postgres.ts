import { BeneficiaryEntity } from '../../domain/entity'
import { BeneficiaryRepository } from '../../domain/repository'
import { db } from 'src/data/drizzle/config/orm'
import { beneficiary, user } from 'src/data/drizzle/schemas'
import { eq } from 'drizzle-orm'
import { BadRequestError, ConflictError, NotFoundError } from 'src/helpers/errors/custom_error'

/**
 * PostgresRepository class.
 * 
 * This class implements the BeneficiaryRepository interface to provide methods for interacting with the PostgreSQL database.
 * 
 * @implements {BeneficiaryRepository}
*/
export class PostgresRepository implements BeneficiaryRepository {
  /**
   * Retrieves a beneficiary by their ID from the database.
   * 
   * @param {string} id - The ID of the beneficiary to retrieve.
   * @returns {Promise<BeneficiaryEntity>} A promise that resolves with the beneficiary entity.
   * @throws {NotFoundError} If the beneficiary with the given ID does not exist.
  */
  async getBeneficiaryById(id: string): Promise<BeneficiaryEntity> {
    const beneficiaryObtained = await db
      .select({
        id: beneficiary.id,
        user: {
          id: user.id,
          name: user.name,
          lastName1: user.lastName1,
          lastName2: user.lastName2,
          email: user.email
        }
      })
      .from(beneficiary)
      .innerJoin(beneficiary, eq(user.id, beneficiary.userId))
      .where(eq(user.id, id))
      .limit(1)

    if (beneficiaryObtained.length === 0) {
      throw new NotFoundError(`beneficiary with id '${id}'`)
    }
    return {
      id: beneficiaryObtained[0].id,
      user: {
        id: beneficiaryObtained[0].user.id,
        name: beneficiaryObtained[0].user.name,
        lastName1: beneficiaryObtained[0].user.lastName1,
        lastName2: beneficiaryObtained[0].user.lastName2 || undefined,
        email: beneficiaryObtained[0].user.email
      }
    }
  }

  /**
   * Retrieves a beneficiary by their email from the database.
   * 
   * @param {string} email - The email of the beneficiary to retrieve.
   * @returns {Promise<BeneficiaryEntity>} A promise that resolves with the beneficiary entity.
   * @throws {NotFoundError} If the beneficiary with the given email does not exist.
  */
  async getBeneficiaryByEmail(email: string): Promise<BeneficiaryEntity> {
    const beneficiaryObtained = await db
      .select({
        id: beneficiary.id,
        user: {
          id: user.id,
          name: user.name,
          lastName1: user.lastName1,
          lastName2: user.lastName2,
          email: user.email,
          password: user.password
        }
      })
      .from(beneficiary)
      .innerJoin(user, eq(beneficiary.userId, user.id))
      .where(eq(user.email, email))
      .limit(1)

    if (beneficiaryObtained.length === 0) {
      throw new NotFoundError(`beneficiary with email '${email}'`)
    }
    return {
      id: beneficiaryObtained[0].id,
      user: {
        id: beneficiaryObtained[0].user.id,
        name: beneficiaryObtained[0].user.name,
        lastName1: beneficiaryObtained[0].user.lastName1,
        lastName2: beneficiaryObtained[0].user.lastName2 || undefined,
        email: beneficiaryObtained[0].user.email,
        password: beneficiaryObtained[0].user.password
      }
    }
  }

  /**
   * Creates a new beneficiary in the database.
   * 
   * @param {BeneficiaryEntity} beneficiaryData - The beneficiary entity to be created.
   * @returns {Promise<BeneficiaryEntity>} A promise that resolves with the created beneficiary entity.
   * @throws {ConflictError} If a beneficiary with the given email already exists.
   * @throws {DatabaseError} If the beneficiary could not be created.
   * @throws {BadRequestError} If the password is missing.
  */
  async createBeneficiary(beneficiaryData: BeneficiaryEntity): Promise<BeneficiaryEntity> {
    const beneficiaryObtained = await db
      .select({
        id: beneficiary.id
      })
      .from(beneficiary)
      .innerJoin(user, eq(beneficiary.userId, user.id))
      .where(eq(user.email, beneficiaryData.user.email))
      .limit(1)

    if (beneficiaryObtained.length > 0) {
      throw new ConflictError(`email already exists`)
    }

    if (beneficiaryData.user.password) {
      return await db.transaction(async tx  => {
        const userCreated = await tx
          .insert(user)
          .values({
            id: beneficiaryData.user.id,
            name: beneficiaryData.user.name,
            lastName1: beneficiaryData.user.lastName1,
            lastName2: beneficiaryData.user.lastName2,
            email: beneficiaryData.user.email,
            password: beneficiaryData.user.password || ''
          })
          .returning({
            id: user.id,
            name: user.name,
            lastName1: user.lastName1,
            lastName2: user.lastName2,
            email: user.email
          })

        const beneficiaryCreated = await tx
          .insert(beneficiary)
          .values({
            id: beneficiaryData.id,
            userId: userCreated[0].id
          })
          .returning({
            id: beneficiary.id
          })

        return {
          id: beneficiaryCreated[0].id,
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