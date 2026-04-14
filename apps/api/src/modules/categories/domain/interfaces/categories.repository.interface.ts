import { Category } from '../entities/category.entity';

export abstract class ICategoriesRepository {
  abstract findAll(includeInactive?: boolean): Promise<Category[]>;
  abstract findById(id: number): Promise<Category | null>;
  abstract findBySlug(slug: string): Promise<Category | null>;
  abstract save(category: Partial<Category>): Promise<Category>;
  abstract update(id: number, category: Partial<Category>): Promise<Category>;
}
