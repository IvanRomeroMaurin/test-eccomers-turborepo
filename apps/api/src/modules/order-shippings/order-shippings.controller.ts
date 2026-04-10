import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderShippingsService } from './order-shippings.service';
import { CreateOrderShippingDto } from './dto/create-order-shipping.dto';
import { UpdateOrderShippingDto } from './dto/update-order-shipping.dto';

@Controller('order_shippings')
export class OrderShippingsController {
  constructor(private readonly service: OrderShippingsService) {}

  @Post()
  create(@Body() dto: CreateOrderShippingDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateOrderShippingDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
