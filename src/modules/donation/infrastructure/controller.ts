import { Request, Response, NextFunction } from 'express'
import { DonationUseCase } from '../application/use_cases/donation'
import { listDonationsSchema } from '../application/schemas/donation'
import { BadRequestError } from 'src/helpers/errors/custom_error'

export class DonationController {
  private readonly useCase: DonationUseCase

  constructor(useCase: DonationUseCase) {
    this.useCase = useCase
  }

  public listDonations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = listDonationsSchema.parse(req.query)
      const donations = await this.useCase.listDonations(
        query.page as number,
        query.limit as number,
        query.name,
        query.categoryId,
        query.collectionCenterId
      )

      res.sendSuccess({ status: 200, message: 'success', data: donations.donations, meta: donations.meta })
    } catch (error) {
      next(error)
    }
  }

  public createDonation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { body, file } = req

      if (!file) {
        throw new BadRequestError('image is required')
      }

      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`

      const donation = await this.useCase.createDonation(
        req.user as string,
        body.categoryId,
        body.collectionCenterId,
        body.name,
        body.description,
        imageUrl
      )

      res.status(201).sendSuccess({ status: 201, message: 'Donation created successfully', data: donation, meta: null })
    } catch (error) {
      next(error)
    }
  }
}