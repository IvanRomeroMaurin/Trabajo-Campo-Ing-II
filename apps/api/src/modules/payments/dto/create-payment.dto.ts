import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Payment } from '@repo/types';

export class CreatePaymentDto implements Omit<Payment, 'id' | 'created_at' | 'is_active'> {
  @IsNotEmpty()
  order_id: bigint;

  @IsNotEmpty()
  @IsNumber()
  method_id: number;

  @IsNotEmpty()
  @IsNumber()
  status_id: number;

  @IsOptional()
  @IsString()
  external_id: string | null;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
