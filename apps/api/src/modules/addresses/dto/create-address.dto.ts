import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Address } from '@repo/types';

export class CreateAddressDto implements Omit<Address, 'id' | 'is_active'> {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  address_line: string;

  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @IsNotEmpty()
  @IsNumber()
  postal_code_id: number;

  @IsOptional()
  @IsBoolean()
  is_default: boolean | null;
}
