import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderItem } from '@repo/types';

export class CreateOrderItemDto implements Omit<OrderItem, 'id' | 'is_active'> {
  @IsNotEmpty()
  order_id: bigint;

  @IsOptional()
  @IsNumber()
  product_id: number | null;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  product_variant_id: number | null;
}

