import { userTypes } from 'src/config/constants'
import { Pagination } from '../utils/pagination'
import { SuccessResponse, ErrorResponse } from 'src/utils/response'

declare global {
  namespace Express {
    interface Request {
      pagination?: Pagination
      user?: string
      role?: userTypes
    }
    interface Response {
      sendSuccess(response: SuccessResponse): this
      sendError(response: ErrorResponse): this
    }
  }
}