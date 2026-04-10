import { Module } from '@nestjs/common';
import { PaymentStatussService } from './payment-statuses.service';
import { PaymentStatussController } from './payment-statuses.controller';

@Module({
  controllers: [PaymentStatussController],
  providers: [PaymentStatussService],
  exports: [PaymentStatussService],
})
export class PaymentStatusesModule {}
