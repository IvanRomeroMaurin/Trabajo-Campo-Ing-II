import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from '@repo/types';

export class CreateProductDto implements Omit<Product, 'id' | 'created_at' | 'is_active'> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  image: string | null;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsOptional()
  is_active?: boolean;
}
