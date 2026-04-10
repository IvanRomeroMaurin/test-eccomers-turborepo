import { Module } from '@nestjs/common';
import { OrderStatusesModule as OrderStatusesService } from './order-statuses.service';
import { OrderStatusesController } from './order-statuses.controller';

@Module({
  controllers: [OrderStatusesController],
  providers: [OrderStatusesService],
  exports: [OrderStatusesService],
})
export class OrderStatusesModule {}
