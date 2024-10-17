import { BeneficiaryAuthValue } from '../../domain/value'
import { DTOBeneficiaryResponse } from 'src/modules/beneficiary/application/dtos/beneficiary_response'

/**
 * Data Transfer Object for Beneficiary Auth Response.
 * 
 * This class is responsible for transferring user data between different parts of the application or across application boundaries.
 * @example
 * ```ts
 * const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZDgwNzQwNi1hNTQzLTRlMWYtYjAxOS1jOGIwNWQ1OGM1OWIiLCJpYXQiOjE3MjQ2MzExMjksImV4cCI6MTcyNTkyNzEyOX0.l7WXdoTopPRqeK-TNIgJtCoR863Yot5cJC-jV3v6DwJtrvH9wjqGFPHpgo00z4d9jCbMTEBnUfv2NkFCk4ecPt4YTledruAuxQoULk3NqoaXhn4wlKhQj7w14ngldir_pud4SxXJnfaw_zd1xg6Gd7rDH-LAWUYaNyvs8qt2CRra7pnBA6tBUvrO58HYReJRQU-GQP9PWRmRC4G8H3tpnGEybn4NcNCn-rO-PIgABZ1I3Len1y8ibKMrz53Rc1PTUTInD96RORM5zp5c06qkyUjW9AThFQwmYP9Yzo4z3fBsuvqQFha31lWoqzP5LNk2iOHECuequuLPThtNWdsRyw'
 * const refreshToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZDgwNzQwNi1hNTQzLTRlMWYtYjAxOS1jOGIwNWQ1OGM1OWIiLCJpYXQiOjE3MjQ2MzExMjksImV4cCI6MTcyNTkyNzEyOX0.l7WXdoTopPRqeK-TNIgJtCoR863Yot5cJC-jV3v6DwJtrvH9wjqGFPHpgo00z4d9jCbMTEBnUfv2NkFCk4ecPt4YTledruAuxQoULk3NqoaXhn4wlKhQj7w14ngldir_pud4SxXJnfaw_zd1xg6Gd7rDH-LAWUYaNyvs8qt2CRra7pnBA6tBUvrO58HYReJRQU-GQP9PWRmRC4G8H3tpnGEybn4NcNCn-rO-PIgABZ1I3Len1y8ibKMrz53Rc1PTUTInD96RORM5zp5c06qkyUjW9AThFQwmYP9Yzo4z3fBsuvqQFha31lWoqzP5LNk2iOHECuequuLPThtNWdsRyw'
 * const beneficiaryId = '938d6f5b-b4a6-4669-a514-ddb3a23621fc'
 * const beneficiaryObtained = await this.beneficiaryRepository.getBeneficiaryById(beneficiaryId)
 * const authValue = new DTOBeneficiaryAuthResponse({
 *   accessToken,
 *   refreshToken,
 *   beneficiary: beneficiaryObtained
 * })
 * ```
*/
export class DTOBeneficiaryAuthResponse {
  /**
   * The access token of the user.
  */
  accessToken: string

  /**
   * The refresh token of the user.
  */
  refreshToken: string

  /**
   * The information of the user.
  */
  beneficiary: DTOBeneficiaryResponse

  /**
   * Creates an instance of DTOAuthResponse.
   * 
   * @param {BeneficiaryValue} beneficiary - The beneficiary auth value object from the domain layer.
  */
  constructor({ accessToken, refreshToken, beneficiary }: BeneficiaryAuthValue) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.beneficiary = new DTOBeneficiaryResponse(beneficiary)
  }
}