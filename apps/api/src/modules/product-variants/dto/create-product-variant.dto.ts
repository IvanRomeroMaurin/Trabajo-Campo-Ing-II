import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsBoolean, IsString } from 'class-validator';

export class CreateProductVariantDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  product_id: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'SKU-001', required: false })
  sku?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 0, required: false })
  price_modifier?: number;

  @IsNumber()
  @ApiProperty({ example: 10 })
  stock: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, required: false })
  is_active?: boolean;
}
