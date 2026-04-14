import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateAttributeTypeDto {
  @ApiProperty({ example: 'Color' })
  name: string;

  @ApiProperty({ example: 'color' })
  slug: string;

  @ApiProperty({ example: 'products', required: false })
  applies_to?: string;

  @IsOptional()
  @ApiProperty({ example: true, required: false })
  is_active?: boolean;
}
