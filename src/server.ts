import express from 'express'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import { responseMiddleware } from './middlewares/response'
import { logRequestMiddleware } from './middlewares/log_request'
import { logErrors, unknownErrorHandler, customErrorHandler } from './middlewares/error'

import { router as authRouter } from './modules/auth/infrastructure/router'
import { router as donationRouter } from './modules/donation/infrastructure/router'

import { ForbiddenError } from './helpers/errors/custom_error'

import { serve, setup } from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'

import { uploadDir } from './config/multer'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(logRequestMiddleware)
app.use(responseMiddleware)

const whitelist = ['http://localhost:5173']
app.use(cors({
  origin: (origin, callback) => {
    if (whitelist.includes(origin as string) || !origin) {
      callback(null, true)
    } else {
      callback(new ForbiddenError())
    }
  },
  credentials: true
}))

app.use('/uploads', express.static(uploadDir))

app.use('/api', authRouter)
app.use('/api', donationRouter)

app.use('/docs', serve, setup(swaggerSpec))

app.use(logErrors)
app.use(customErrorHandler)
app.use(unknownErrorHandler)

export { app }