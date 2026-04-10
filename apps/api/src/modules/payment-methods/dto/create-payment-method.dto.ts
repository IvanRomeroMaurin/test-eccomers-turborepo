import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { PaymentMethod } from '@repo/types';

export class CreatePaymentMethodDto implements Omit<PaymentMethod, 'id'> {
  @IsNotEmpty()
  @IsString()
  name: string;
}
