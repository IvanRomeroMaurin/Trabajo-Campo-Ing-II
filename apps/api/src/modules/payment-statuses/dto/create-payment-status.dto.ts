import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { PaymentStatus } from '@repo/types';

export class CreatePaymentStatusDto implements Omit<PaymentStatus, 'id' | 'is_active'> {
  @IsNotEmpty()
  @IsString()
  name: string;
}
