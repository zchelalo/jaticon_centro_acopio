/**
 * Represents a Category entity.
 * 
 * This interface defines the structure of a Category object in the domain layer.
 * It includes information such as `id`, and `key`.
 * 
 * @interface CategoryEntity
 */
export interface CategoryEntity {
  /**
   * The id of the donar.
  */
  id: string

  /**
   * The key of the category.
  */
  key: string
}