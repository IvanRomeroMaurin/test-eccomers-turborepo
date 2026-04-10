import { IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '@repo/types';

export class CreateOrderStatusDto implements Omit<OrderStatus, 'id'> {
  @IsNotEmpty()
  @IsString()
  name: string;
}
