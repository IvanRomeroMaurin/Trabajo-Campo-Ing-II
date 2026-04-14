import { IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '@repo/types';

export class CreateOrderStatusDto implements Omit<OrderStatus, 'id' | 'is_active'> {
  @IsNotEmpty()
  @IsString()
  name: string;
}
