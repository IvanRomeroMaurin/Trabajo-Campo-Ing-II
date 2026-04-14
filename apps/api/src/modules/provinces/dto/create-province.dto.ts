import { IsNotEmpty, IsString } from 'class-validator';
import { Province } from '@repo/types';

export class CreateProvinceDto implements Omit<Province, 'id' | 'is_active'> {
  @IsNotEmpty()
  @IsString()
  name: string;
}
