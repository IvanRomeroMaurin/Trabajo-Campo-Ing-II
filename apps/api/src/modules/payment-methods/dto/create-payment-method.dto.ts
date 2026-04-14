import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { PaymentMethod } from '@repo/types';

export class CreatePaymentMethodDto implements Omit<PaymentMethod, 'id' | 'is_active'> {
  @IsNotEmpty()
  @IsString()
  name: string;
}
