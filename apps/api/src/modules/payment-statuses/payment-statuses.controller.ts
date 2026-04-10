import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentStatussService } from './payment-statuses.service';
import { CreatePaymentStatusDto } from './dto/create-payment-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

@Controller('payment_statuses')
export class PaymentStatussController {
  constructor(private readonly service: PaymentStatussService) {}

  @Post()
  create(@Body() dto: CreatePaymentStatusDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePaymentStatusDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
