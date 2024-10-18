import { CategoryRepository } from "src/modules/category/domain/repository"
import { DonationRepository } from "../../domain/repository"
import { CollectionCenterRepository } from "src/modules/collection_center/domain/repository"
import { DonationStatusRepository } from "src/modules/donation_status/domain/repository"
import { DonarRepository } from "src/modules/donar/domain/repository"
import { listDonationsSchema } from "../schemas/donation"
import { Meta } from "src/helpers/meta"
import { DonationEntity } from "../../domain/entity"
import { DonationValue } from "../../domain/value"
import { donationStatus } from "src/config/constants"

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
export class DonationUseCase {
  /**
   * @private
   * @property {DonationRepository} donationRepository - The repository used to interact with donation data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly donationRepository: DonationRepository

  /**
   * @private
   * @property {CategoryRepository} categoryRepository - The repository used to interact with category data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly categoryRepository: CategoryRepository

  /**
   * @private
   * @property {CollectionCenterRepository} collectionCenterRepository - The repository used to interact with collection center data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly collectionCenterRepository: CollectionCenterRepository

  /**
   * @private
   * @property {DonationStatusRepository} donationStatusRepository - The repository used to interact with donation status data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly donationStatusRepository: DonationStatusRepository

  /**
   * @private
   * @property {DonarRepository} donarRepository - The repository used to interact with donar data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly donarRepository: DonarRepository

  /**
   * Creates an instance of AuthUseCase.
   * 
   * @param {DonationRepository} donationRepository - The repository that provides access to donation data.
   * @param {CategoryRepository} categoryRepository - The repository that provides access to category data.
   * @param {CollectionCenterRepository} collectionCenterRepository - The repository that provides access to collection center data.
   * @param {DonationStatusRepository} donationStatusRepository - The repository that provides access to donation status data.
   * @param {DonarRepository} donarRepository - The repository that provides access to donar data.
   * The repositories are injected to allow for greater flexibility and easier testing.
  */
  constructor(
    donationRepository: DonationRepository,
    categoryRepository: CategoryRepository,
    collectionCenterRepository: CollectionCenterRepository,
    donationStatusRepository: DonationStatusRepository,
    donarRepository: DonarRepository
  ) {
    this.donationRepository = donationRepository
    this.categoryRepository = categoryRepository
    this.collectionCenterRepository = collectionCenterRepository
    this.donationStatusRepository = donationStatusRepository
    this.donarRepository = donarRepository
  }

  public async listDonations(page: number, limit: number, name?: string, categoryId?: string, collectionCenterId?: string): Promise<{ meta: Meta, donations: DonationEntity[] }> {
    listDonationsSchema.parse({ page, limit, name, categoryId, collectionCenterId })

    const pendingStatus = await this.donationStatusRepository.getDonationStatusByKey(donationStatus.PENDING)

    const count = await this.donationRepository.countDonations(pendingStatus.id, name, categoryId, collectionCenterId)
    const meta = new Meta({
      page,
      perPage: limit,
      total: count,
      pagLimitDef: process.env.PAGINATION_LIMIT_DEFAULT
    })
    const donations = await this.donationRepository.listDonations(meta.getOffset(), meta.getLimit(), pendingStatus.id, name, categoryId, collectionCenterId)

    return { meta, donations }
  }

  public async createDonation(userId: string, categoryId: string, collectionCenterId: string, name: string, description: string, file: string): Promise<DonationEntity> {
    const donar = await this.donarRepository.getDonarById(userId)
    const category = await this.categoryRepository.getCategoryById(categoryId)
    const collectionCenter = await this.collectionCenterRepository.getCollectionCenterById(collectionCenterId)
    const donationStatusObtained = await this.donationStatusRepository.getDonationStatusByKey(donationStatus.PENDING)

    const donation = new DonationValue(
      category,
      donar,
      collectionCenter,
      donationStatusObtained,
      name,
      description,
      file
    )

    const donationCreated = await this.donationRepository.createDonation(donation)

    return donationCreated
  }
}