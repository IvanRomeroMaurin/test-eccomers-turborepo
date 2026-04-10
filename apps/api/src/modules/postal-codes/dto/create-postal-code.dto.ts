import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { PostalCode } from '@repo/types';

export class CreatePostalCodeDto implements Omit<PostalCode, 'id'> {
  @IsNotEmpty()
  @IsString()
  code: string;
}
