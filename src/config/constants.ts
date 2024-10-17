/**
 * Constants for the cookie names used in the application.
 * 
 * @enum
*/
export enum cookieNames {
  /**
   * The name of the cookie that stores the refresh token.
  */
  REFRESH_TOKEN = 'refresh_token',

  /**
   * The name of the cookie that stores the access token.
  */
  ACCESS_TOKEN = 'access_token'
}

/**
 * Constants for the token types used in the application.
 * 
 * @enum
*/
export enum tokenTypes {
  /**
   * The type of token used to refresh the access token.
   */
  REFRESH = 'refresh',

  /**
   * The type of token used to recover an account.
   */
  RECOVER = 'recover',

  /**
   * The type of token used to verify an account.
   */
  VERIFY = 'verify'
}

/**
 * Constants for the categories used in the application.
 * 
 * @enum
*/
export enum categories {
  /**
   * The category of clothes.
   */
  CLOTHES = 'ropa',

  /**
   * The category of electronics.
   */
  ELECTRONICS = 'electrónica',

  /**
   * The category of books.
   */
  BOOKS = 'libros',

  /**
   * The category of sports.
   */
  SPORTS = 'deportes',

  /**
   * The category of toys.
   */
  TOYS = 'juguetes',

  /**
   * The category of home.
   */
  HOME = 'hogar',

  /**
   * The category of food.
   */
  FOOD = 'alimentos'
}

/**
 * Constants for the roles used in the application.
 * 
 * @enum
 */
export enum donationStatus {
  /**
   * The status of a donation that is pending.
   */
  PENDING = 'pendiente',

  /**
   * The status of a donation that is accepted.
   */
  ACCEPTED = 'aceptada',

  /**
   * The status of a donation that is delivered.
   */
  DELIVERED = 'entregada',

  /**
   * The status of a donation that is cancelled.
   */
  CANCELLED = 'cancelada'
}

/**
 * Constants for the roles used in the application.
 * 
 * @enum
 */
export enum requestStatus {
  /**
   * The status of a request that is solicited.
   */
  REQUESTED = 'solicitada',

  /**
   * The status of a request that is accepted.
   */
  FULLFILLED = 'cumplida',

  /**
   * The status of a request that is cancelled.
   */
  PENDING = 'pendiente',

  /**
   * The status of a request that is cancelled.
   */
  CANCELLED = 'cancelada'
}

export enum userTypes {
  /**
   * The type of user that is a donor.
   */
  DONOR = 'donante',

  /**
   * The type of user that is a beneficiary.
   */
  BENEFICIARY = 'beneficiario'
}