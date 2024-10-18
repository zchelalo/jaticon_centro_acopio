import { Router } from 'express'

import { PostgresRepository as DonationPostgresRepository } from './repositories/postgres'
import { PostgresRepository as DonarRepository } from 'src/modules/donar/infrastructure/repositories/postgres'
import { PostgresRepository as CategoryRepository } from 'src/modules/category/infrastructure/repositories/postgres'
import { PostgresRepository as CollectionCenterRepository } from 'src/modules/collection_center/infrastructure/repositories/postgres'
import { PostgresRepository as DonationStatusRepository } from 'src/modules/donation_status/infrastructure/repositories/postgres'
import { DonationUseCase } from '../application/use_cases/donation'
import { DonationController } from './controller'

import { authMiddleware } from 'src/middlewares/auth'
import { validateData, Type } from 'src/middlewares/validator'
import { listDonationsSchema, createDonationRequestSchema } from '../application/schemas/donation'

import { upload } from 'src/config/multer'

const router = Router()

const donationRepository = new DonationPostgresRepository()
const categoryRepository = new CategoryRepository()
const collectionCenterRepository = new CollectionCenterRepository()
const donationStatusRepository = new DonationStatusRepository()
const donarRepository = new DonarRepository()
const useCase = new DonationUseCase(donationRepository, categoryRepository, collectionCenterRepository, donationStatusRepository, donarRepository)
const donationController = new DonationController(useCase)

router.get('/donations', authMiddleware, validateData(listDonationsSchema, Type.QUERY), donationController.listDonations)
router.post('/donations',
  authMiddleware,
  upload.single('image'),
  validateData(createDonationRequestSchema, Type.BODY),
  donationController.createDonation
)

export { router }