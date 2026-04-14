import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryCommand } from '../../application/interfaces/category-commands.interface';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) implements UpdateCategoryCommand {}
