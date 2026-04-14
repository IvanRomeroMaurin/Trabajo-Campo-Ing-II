import { Category as ICategory } from '@repo/types';

export class Category implements ICategory {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string | null,
    public readonly is_active: boolean,
    public readonly created_at: Date | null
  ) {}

  static create(id: number, name: string, slug: string, description: string | null, is_active: boolean, created_at: Date | null): Category {
    return new Category(id, name, slug, description, is_active, created_at);
  }
}
