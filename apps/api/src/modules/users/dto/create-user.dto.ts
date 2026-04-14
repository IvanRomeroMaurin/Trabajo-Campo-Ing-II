import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { User } from '@repo/types';

export class CreateUserDto implements Omit<User, 'id' | 'created_at' | 'is_active'> {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string | null;

  @IsOptional()
  @IsString()
  phone: string | null;

  @IsOptional()
  is_active?: boolean;
}
