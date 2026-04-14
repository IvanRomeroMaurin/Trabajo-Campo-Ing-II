import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics' })
  name: string;

  @ApiProperty({ example: 'electronics' })
  slug: string;

  @ApiProperty({ example: 'Electronic gadgets and devices', required: false })
  description?: string;

  @IsOptional()
  @ApiProperty({ example: true, required: false })
  is_active?: boolean;
}
