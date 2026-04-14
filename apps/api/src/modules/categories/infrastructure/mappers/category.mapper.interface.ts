import { categories as PrismaCategory } from '@prisma/client';
import { Category } from '../../domain/entities/category.entity';

export abstract class ICategoryMapper {
  abstract toDomain(prismaCategory: PrismaCategory): Category;
}
