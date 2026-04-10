import { Module } from '@nestjs/common';
import { OrderShippingsService } from './order-shippings.service';
import { OrderShippingsController } from './order-shippings.controller';

@Module({
  controllers: [OrderShippingsController],
  providers: [OrderShippingsService],
  exports: [OrderShippingsService],
})
export class OrderShippingsModule {}
