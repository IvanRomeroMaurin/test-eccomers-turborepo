import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductStock } from '@repo/types';

export class CreateProductStockDto implements Omit<ProductStock, 'id'> {
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
