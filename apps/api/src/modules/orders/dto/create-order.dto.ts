import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Order } from '@repo/types';

export class CreateOrderDto implements Omit<Order, 'id' | 'created_at' | 'is_active'> {
  @IsOptional()
  @IsString()
  user_id: string | null;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  status_id: number;
}
