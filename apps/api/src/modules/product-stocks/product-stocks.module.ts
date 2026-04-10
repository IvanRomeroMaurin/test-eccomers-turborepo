import { Module } from '@nestjs/common';
import { ProductStocksService } from './product-stocks.service';
import { ProductStocksController } from './product-stocks.controller';

@Module({
  controllers: [ProductStocksController],
  providers: [ProductStocksService],
  exports: [ProductStocksService],
})
export class ProductStocksModule {}
