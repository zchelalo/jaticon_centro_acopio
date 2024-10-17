import { DonarAuthValue } from '../../domain/value'
import { DTODonarResponse } from 'src/modules/donar/application/dtos/donar_response'

/**
 * Data Transfer Object for Donar Auth Response.
 * 
 * This class is responsible for transferring user data between different parts of the application or across application boundaries.
 * @example
 * ```ts
 * const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZDgwNzQwNi1hNTQzLTRlMWYtYjAxOS1jOGIwNWQ1OGM1OWIiLCJpYXQiOjE3MjQ2MzExMjksImV4cCI6MTcyNTkyNzEyOX0.l7WXdoTopPRqeK-TNIgJtCoR863Yot5cJC-jV3v6DwJtrvH9wjqGFPHpgo00z4d9jCbMTEBnUfv2NkFCk4ecPt4YTledruAuxQoULk3NqoaXhn4wlKhQj7w14ngldir_pud4SxXJnfaw_zd1xg6Gd7rDH-LAWUYaNyvs8qt2CRra7pnBA6tBUvrO58HYReJRQU-GQP9PWRmRC4G8H3tpnGEybn4NcNCn-rO-PIgABZ1I3Len1y8ibKMrz53Rc1PTUTInD96RORM5zp5c06qkyUjW9AThFQwmYP9Yzo4z3fBsuvqQFha31lWoqzP5LNk2iOHECuequuLPThtNWdsRyw'
 * const refreshToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZDgwNzQwNi1hNTQzLTRlMWYtYjAxOS1jOGIwNWQ1OGM1OWIiLCJpYXQiOjE3MjQ2MzExMjksImV4cCI6MTcyNTkyNzEyOX0.l7WXdoTopPRqeK-TNIgJtCoR863Yot5cJC-jV3v6DwJtrvH9wjqGFPHpgo00z4d9jCbMTEBnUfv2NkFCk4ecPt4YTledruAuxQoULk3NqoaXhn4wlKhQj7w14ngldir_pud4SxXJnfaw_zd1xg6Gd7rDH-LAWUYaNyvs8qt2CRra7pnBA6tBUvrO58HYReJRQU-GQP9PWRmRC4G8H3tpnGEybn4NcNCn-rO-PIgABZ1I3Len1y8ibKMrz53Rc1PTUTInD96RORM5zp5c06qkyUjW9AThFQwmYP9Yzo4z3fBsuvqQFha31lWoqzP5LNk2iOHECuequuLPThtNWdsRyw'
 * const donarId = '938d6f5b-b4a6-4669-a514-ddb3a23621fc'
 * const donarObtained = await this.donarRepository.getDonarById(donarId)
 * const authValue = new DTODonarAuthResponse({
 *   accessToken,
 *   refreshToken,
 *   donar: donarObtained
 * })
 * ```
*/
export class DTODonarAuthResponse {
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
  donar: DTODonarResponse

  /**
   * Creates an instance of DTOAuthResponse.
   * 
   * @param {DonarValue} donar - The donar auth value object from the domain layer.
  */
  constructor({ accessToken, refreshToken, donar }: DonarAuthValue) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.donar = new DTODonarResponse(donar)
  }
}