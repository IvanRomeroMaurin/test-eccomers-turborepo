import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductStocksService } from './product-stocks.service';
import { CreateProductStockDto } from './dto/create-product-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';

@Controller('product_stocks')
export class ProductStocksController {
  constructor(private readonly service: ProductStocksService) {}

  @Post()
  create(@Body() dto: CreateProductStockDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateProductStockDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
