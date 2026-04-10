import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { User } from '@repo/types';

export class CreateUserDto implements Omit<User, 'id' | 'created_at'> {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string | null;

  @IsOptional()
  @IsString()
  phone: string | null;

}
