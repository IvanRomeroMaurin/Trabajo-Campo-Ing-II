export class CategoryNotFoundError extends Error {
  constructor(idOrSlug: string | number) {
    super(`Category ${idOrSlug} not found`);
    this.name = 'CategoryNotFoundError';
  }
}

export class CategoryAlreadyExistsError extends Error {
  constructor(slug: string) {
    super(`Category with slug "${slug}" already exists`);
    this.name = 'CategoryAlreadyExistsError';
  }
}

export class CategoryAlreadyActiveError extends Error {
  constructor(id: number) {
    super(`Category #${id} is already active`);
    this.name = 'CategoryAlreadyActiveError';
  }
}
