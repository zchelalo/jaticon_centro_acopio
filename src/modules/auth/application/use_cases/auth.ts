import { AuthRepository } from '../../domain/repository'
import { UserValue } from 'src/modules/user/domain/value'
import { TokenValue } from '../../domain/value'

import { DTOBeneficiaryAuthResponse } from '../dtos/beneficiary_auth_response'
import { DTOUserCreate } from 'src/modules/user/application/dtos/user_create'
import { signInSchema, signOutSchema, tokenSchema } from '../schemas/auth'
import { createUserSchema } from 'src/modules/user/application/schemas/user'

import { createJWT, tokenExpiration, TokenType, verifyJWT } from 'src/utils/jwt'
import { durationToMilliseconds } from 'src/utils/time_converter'

import { InternalServerError, UnauthorizedError } from 'src/helpers/errors/custom_error'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BeneficiaryRepository } from 'src/modules/beneficiary/domain/repository'
import { DonarRepository } from 'src/modules/donar/domain/repository'

import { tokenTypes } from 'src/config/constants'
import { DTODonarAuthResponse } from '../dtos/donar_auth_response'
import { BeneficiaryValue } from 'src/modules/beneficiary/domain/value'
import { DonarValue } from 'src/modules/donar/domain/value'
import { DTOUserResponse } from 'src/modules/user/application/dtos/user_response'

/**
 * Create a new Auth Use Case.
 * Provides methods to interact with Auth data including signing in, signing up, and signing out.
 * 
 * This class is part of the application layer in the hexagonal architecture and relies on a UserRepository to access and manipulate user data and an AuthRepository to access and manipulate tokens data.
 * 
 * The `DTOAuthResponse` is used within these methods and is documented in their respective modules.
 * 
 * @example
 * ```ts
 * const userRepository = new UserPostgresRepository()
 * const authUseCase = new AuthUseCase(userRepository)
 * ```
 */
export class AuthUseCase {
  /**
   * @private
   * @property {AuthRepository} authRepository - The repository used to interact with tokens data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly authRepository: AuthRepository

  /**
   * @private
   * @property {BeneficiaryRepository} beneficiaryRepository - The repository used to interact with beneficiary data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly beneficiaryRepository: BeneficiaryRepository

  /**
   * @private
   * @property {DonarRepository} donarRepository - The repository used to interact with donar data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly donarRepository: DonarRepository

  /**
   * Creates an instance of AuthUseCase.
   * 
   * @param {AuthRepository} authRepository - The repository that provides access to auth data.
   * @param {BeneficiaryRepository} beneficiaryRepository - The repository that provides access to beneficiary data.
   * @param {DonarRepository} donarRepository - The repository that provides access to donar data.
   * The repositories are injected to allow for greater flexibility and easier testing.
  */
  constructor(authRepository: AuthRepository, beneficiaryRepository: BeneficiaryRepository, donarRepository: DonarRepository) {
    this.authRepository = authRepository
    this.beneficiaryRepository = beneficiaryRepository
    this.donarRepository = donarRepository
  }

  /**
   * @function signInBeneficiary
   * @description Sign in beneficiary a user.
   * @param email - Email of user.
   * @param password - Password of user.
   * @returns {Promise<DTOBeneficiaryAuthResponse>} A promise that resolves to the DTOBeneficiaryAuthResponse.
   * @throws {UnauthorizedError} If the email or password is incorrect.
   * @example
   * ```ts
   * const email = 'test@email.com'
   * const password = '12345678'
   * const authData = await authUseCase.signInBeneficiary(email, password)
   * ```
  */
  public async signInBeneficiary(email: string, password: string): Promise<DTOBeneficiaryAuthResponse> {
    signInSchema.parse({ email, password })

    const beneficiaryObtained = await this.beneficiaryRepository.getBeneficiaryByEmail(email)

    if (!beneficiaryObtained.user.password) {
      throw new InternalServerError('no password founded')
    }

    const isPasswordMatch = await bcrypt.compare(password, beneficiaryObtained.user.password)
    if (!isPasswordMatch) {
      throw new UnauthorizedError()
    }

    const accessToken = await createJWT({ sub: beneficiaryObtained.user.id }, TokenType.ACCESS)
    const refreshToken = await createJWT({ sub: beneficiaryObtained.user.id }, TokenType.REFRESH)

    const tokenType = await this.authRepository.getTokenTypeIdByKey(tokenTypes.REFRESH)
    const newToken = new TokenValue(refreshToken, beneficiaryObtained.user.id, tokenType.id)
    await this.authRepository.saveToken(newToken)

    const authValue = new DTOBeneficiaryAuthResponse({
      accessToken,
      refreshToken,
      beneficiary: {
        id: beneficiaryObtained.id,
        user: new DTOUserResponse(beneficiaryObtained.user)
      }
    })

    return authValue
  }

  /**
   * @function signInDonar
   * @description Sign in donar a user.
   * @param email - Email of user.
   * @param password - Password of user.
   * @returns {Promise<DTODonarAuthResponse>} A promise that resolves to the DTODonarAuthResponse.
   * @throws {UnauthorizedError} If the email or password is incorrect.
   * @example
   * ```ts
   * const email = 'test@email.com'
   * const password = '12345678'
   * const authData = await authUseCase.signInDonar(email, password)
   * ```
  */
  public async signInDonar(email: string, password: string): Promise<DTODonarAuthResponse> {
    signInSchema.parse({ email, password })

    const donarObtained = await this.donarRepository.getDonarByEmail(email)

    if (!donarObtained.user.password) {
      throw new InternalServerError('no password founded')
    }

    const isPasswordMatch = await bcrypt.compare(password, donarObtained.user.password)
    if (!isPasswordMatch) {
      throw new UnauthorizedError()
    }

    const accessToken = await createJWT({ sub: donarObtained.user.id }, TokenType.ACCESS)
    const refreshToken = await createJWT({ sub: donarObtained.user.id }, TokenType.REFRESH)

    const tokenType = await this.authRepository.getTokenTypeIdByKey(tokenTypes.REFRESH)
    const newToken = new TokenValue(refreshToken, donarObtained.user.id, tokenType.id)
    await this.authRepository.saveToken(newToken)

    const authValue = new DTODonarAuthResponse({
      accessToken,
      refreshToken,
      donar: {
        id: donarObtained.id,
        user: new DTOUserResponse(donarObtained.user)
      }
    })

    return authValue
  }

  /**
   * @function signUpBeneficiary
   * @description Sign up a beneficiary.
   * @param name - The name of the beneficiary.
   * @param email - The email of the beneficiary.
   * @param password - The password of the beneficiary.
   * @returns {Promise<DTOBeneficiaryAuthResponse>} A promise that resolves to the DTOBeneficiaryAuthResponse.
   * @example
   * ```ts
   * const name = 'test'
   * const lastName1 = 'lastName1'
   * const lastName2 = 'lastName2'
   * const email = 'test@email.com'
   * const password = '12345678'
   * const authData = await authUseCase.signsignUpBeneficiaryUp(name, lastName1, lastName2, email, password)
   * ```
  */
  public async signUpBeneficiary(user: DTOUserCreate): Promise<DTOBeneficiaryAuthResponse> {
    createUserSchema.parse(user)

    const hashedPassword = await bcrypt.hash(user.password, 10)

    const newUser = new UserValue(user.name, user.lastName1, user.email, hashedPassword, user.lastName2)
    const newBeneficiary = new BeneficiaryValue(newUser)
    const beneficiaryCreated = await this.beneficiaryRepository.createBeneficiary(newBeneficiary)

    const accessToken = await createJWT({ sub: beneficiaryCreated.user.id }, TokenType.ACCESS)
    const refreshToken = await createJWT({ sub: beneficiaryCreated.user.id }, TokenType.REFRESH)

    const tokenType = await this.authRepository.getTokenTypeIdByKey(tokenTypes.REFRESH)
    const newToken = new TokenValue(refreshToken, beneficiaryCreated.user.id, tokenType.id)
    await this.authRepository.saveToken(newToken)

    const authValue = new DTOBeneficiaryAuthResponse({
      accessToken,
      refreshToken,
      beneficiary: {
        id: beneficiaryCreated.id,
        user: new DTOUserResponse(beneficiaryCreated.user)
      }
    })

    return authValue
  }

  /**
   * @function signUpDonar
   * @description Sign up a donar.
   * @param name - The name of the donar.
   * @param email - The email of the donar.
   * @param password - The password of the donar.
   * @returns {Promise<DTODonarAuthResponse>} A promise that resolves to the DTODonarAuthResponse.
   * @example
   * ```ts
   * const name = 'test'
   * const lastName1 = 'lastName1'
   * const lastName2 = 'lastName2'
   * const email = 'test@email.com'
   * const password = '12345678'
   * const authData = await authUseCase.signsignUpDonarUp(name, lastName1, lastName2, email, password)
   * ```
  */
  public async signUpDonar(user: DTOUserCreate): Promise<DTODonarAuthResponse> {
    createUserSchema.parse(user)

    const hashedPassword = await bcrypt.hash(user.password, 10)

    const newUser = new UserValue(user.name, user.lastName1, user.email, hashedPassword, user.lastName2)
    const newDonar = new DonarValue(newUser)
    const donarCreated = await this.donarRepository.createDonar(newDonar)

    const accessToken = await createJWT({ sub: donarCreated.user.id }, TokenType.ACCESS)
    const refreshToken = await createJWT({ sub: donarCreated.user.id }, TokenType.REFRESH)

    const tokenType = await this.authRepository.getTokenTypeIdByKey(tokenTypes.REFRESH)
    const newToken = new TokenValue(refreshToken, donarCreated.user.id, tokenType.id)
    await this.authRepository.saveToken(newToken)

    const authValue = new DTODonarAuthResponse({
      accessToken,
      refreshToken,
      donar: {
        id: donarCreated.id,
        user: new DTOUserResponse(donarCreated.user)
      }
    })

    return authValue
  }

  /**
   * @function signOut
   * @description Sign out a user.
   * @param refreshToken - The refresh token of the user.
   * @returns {Promise<void>} A promise that resolves to the void.
   * @throws {UnauthorizedError} If the refresh token is invalid.
   * @example
   * ```ts
   * const refreshToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZDgwNzQwNi1hNTQzLTRlMWYtYjAxOS1jOGIwNWQ1OGM1OWIiLCJpYXQiOjE3MjQ2MzExMjksImV4cCI6MTcyNTkyNzEyOX0.l7WXdoTopPRqeK-TNIgJtCoR863Yot5cJC-jV3v6DwJtrvH9wjqGFPHpgo00z4d9jCbMTEBnUfv2NkFCk4ecPt4YTledruAuxQoULk3NqoaXhn4wlKhQj7w14ngldir_pud4SxXJnfaw_zd1xg6Gd7rDH-LAWUYaNyvs8qt2CRra7pnBA6tBUvrO58HYReJRQU-GQP9PWRmRC4G8H3tpnGEybn4NcNCn-rO-PIgABZ1I3Len1y8ibKMrz53Rc1PTUTInD96RORM5zp5c06qkyUjW9AThFQwmYP9Yzo4z3fBsuvqQFha31lWoqzP5LNk2iOHECuequuLPThtNWdsRyw'
   * await authUseCase.signOut(refreshToken)
   * ```
  */
  public async signOut(refreshToken: string): Promise<void> {
    signOutSchema.parse({ refreshToken })

    const payload = await verifyJWT(refreshToken, TokenType.REFRESH)
    if (!payload) {
      throw new UnauthorizedError()
    }

    await this.authRepository.revokeTokenByValue(refreshToken)
  }

  /**
   * @function refreshAccessToken
   * @description Refresh the access token of a user.
   * @param refreshToken - The refresh token of the user.
   * @returns {Promise<{ token: string, userId: string }>} A promise that resolves to the new access token and the user id.
   * @throws {UnauthorizedError} If the refresh token is invalid.
   * @example
   * ```ts
   * const refreshToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZDgwNzQwNi1hNTQzLTRlMWYtYjAxOS1jOGIwNWQ1OGM1OWIiLCJpYXQiOjE3MjQ2MzExMjksImV4cCI6MTcyNTkyNzEyOX0.l7WXdoTopPRqeK-TNIgJtCoR863Yot5cJC-jV3v6DwJtrvH9wjqGFPHpgo00z4d9jCbMTEBnUfv2NkFCk4ecPt4YTledruAuxQoULk3NqoaXhn4wlKhQj7w14ngldir_pud4SxXJnfaw_zd1xg6Gd7rDH-LAWUYaNyvs8qt2CRra7pnBA6tBUvrO58HYReJRQU-GQP9PWRmRC4G8H3tpnGEybn4NcNCn-rO-PIgABZ1I3Len1y8ibKMrz53Rc1PTUTInD96RORM5zp5c06qkyUjW9AThFQwmYP9Yzo4z3fBsuvqQFha31lWoqzP5LNk2iOHECuequuLPThtNWdsRyw'
   * const accessData = await authUseCase.refreshAccessToken(refreshToken)
   * ```
  */
  public async refreshAccessToken(rToken: string): Promise<{ accessToken: string, refreshToken: string | undefined, userId: string }> {
    tokenSchema.parse({ token: rToken })

    const payload = await verifyJWT(rToken, TokenType.REFRESH)
    if (!payload) {
      throw new UnauthorizedError()
    }

    await this.authRepository.getTokenByValue(rToken)

    const accessToken = await createJWT({ sub: payload.sub }, TokenType.ACCESS)

    let refreshToken = undefined
    if (this.shouldRefreshTheRefreshToken(payload)) {
      await this.authRepository.revokeTokenByValue(rToken)

      refreshToken = await createJWT({ sub: payload.sub }, TokenType.REFRESH)

      const tokenType = await this.authRepository.getTokenTypeIdByKey(tokenTypes.REFRESH)
      const newToken = new TokenValue(refreshToken, payload.sub as string, tokenType.id)
      await this.authRepository.saveToken(newToken)
    }

    return {
      accessToken,
      refreshToken,
      userId: payload.sub as string
    }
  }

  private shouldRefreshTheRefreshToken(payload: jwt.JwtPayload): boolean {
    const currentTime = Math.floor(Date.now() / 1000)

    if (!payload.exp) {
      throw new InternalServerError('jwt expiration time is missing')
    }

    const expirationTime = payload.exp

    const totalDuration = durationToMilliseconds(tokenExpiration[TokenType.REFRESH])
    const threshold = totalDuration * 0.25

    return (expirationTime - currentTime) < threshold
  }
}