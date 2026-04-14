import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { CreateCategoryCommand } from '../../application/interfaces/category-commands.interface';

export class CreateCategoryDto implements CreateCategoryCommand {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Electronics' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'electronics' })
  slug: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Electronic gadgets and devices', required: false })
  description?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true, required: false })
  is_active?: boolean;
}
