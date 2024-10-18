/**
 * Represents a Collection Center entity.
 * 
 * This interface defines the structure of a Collection Center object in the domain layer.
 * It includes information such as `id`, 'latitude', 'longitude' and `observation`.
 * 
 * @interface CollectionCenterEntity
 */
export interface CollectionCenterEntity {
  /**
   * The id of the donar.
  */
  id: string

  /**
   * The key of the collection center.
   */
  key: string

  /**
   * The latitude of the collection center.
   */
  latitude: string

  /**
   * The longitude of the collection center.
   */
  longitude: string

  /**
   * The observation of the collection center.
   */
  observation: string
}