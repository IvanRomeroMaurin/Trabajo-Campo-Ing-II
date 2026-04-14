import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { City } from '@repo/types';

export class CreateCityDto implements Omit<City, 'id' | 'is_active'> {
  @IsNotEmpty()
  @IsNumber()
  province_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
