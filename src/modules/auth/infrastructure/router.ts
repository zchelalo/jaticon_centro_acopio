import { Router } from 'express'

import { PostgresRepository as BeneficiaryPostgresRepository } from 'src/modules/beneficiary/infrastructure/repositories/postgres'
import { PostgresRepository as DonarPostgresRepository } from 'src/modules/donar/infrastructure/repositories/postgres'
import { PostgresRepository as AuthPostgresRepository } from './repositories/postgres'
import { AuthUseCase } from '../application/use_cases/auth'
import { AuthController } from './controller'

import { authMiddleware } from 'src/middlewares/auth'
import { validateData, Type } from 'src/middlewares/validator'
import { signInSchema } from '../application/schemas/auth'
import { createUserSchema } from 'src/modules/user/application/schemas/user'

const router = Router()

const authRepository = new AuthPostgresRepository()
const beneficiaryRepository = new BeneficiaryPostgresRepository()
const donarRepository = new DonarPostgresRepository()
const useCase = new AuthUseCase(authRepository, beneficiaryRepository, donarRepository)
const authController = new AuthController(useCase)

router.post('/auth/sign-in/beneficiary', validateData(signInSchema, Type.BODY), authController.signInBeneficiary)
router.post('/auth/sign-in/donar', validateData(signInSchema, Type.BODY), authController.signInDonar)
router.post('/auth/sign-up/beneficiary', validateData(createUserSchema, Type.BODY), authController.signUpBeneficiary)
router.post('/auth/sign-up/donar', validateData(createUserSchema, Type.BODY), authController.signUpDonar)
router.post('/auth/sign-out', authMiddleware, authController.signOut)

export { router }