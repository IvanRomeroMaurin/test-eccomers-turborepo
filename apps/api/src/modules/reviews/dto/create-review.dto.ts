import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Review } from '@repo/types';

export class CreateReviewDto implements Omit<Review, 'id' | 'created_at'> {
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  comment: string | null;
}
