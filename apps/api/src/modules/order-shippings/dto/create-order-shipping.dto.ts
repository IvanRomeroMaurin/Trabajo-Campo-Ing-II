import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderShipping } from '@repo/types';

export class CreateOrderShippingDto implements Omit<OrderShipping, 'id' | 'is_active'> {
  @IsNotEmpty()
  order_id: bigint;

  @IsNotEmpty()
  @IsString()
  recipient_name: string;

  @IsNotEmpty()
  @IsNumber()
  address_id: number;

  @IsOptional()
  @IsString()
  notes: string | null;
}
