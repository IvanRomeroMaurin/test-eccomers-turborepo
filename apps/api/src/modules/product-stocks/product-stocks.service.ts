import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductStockDto } from './dto/create-product-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';

@Injectable()
export class ProductStocksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.product_stocks.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.product_stocks.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`ProductStock #${id} not found`);
    return record;
  }

  create(dto: CreateProductStockDto) {
    return this.prisma.product_stocks.create({ data: dto as any });
  }

  async update(id: number, dto: UpdateProductStockDto) {
    await this.findOne(id);
    return this.prisma.product_stocks.update({ where: { id } as any, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product_stocks.delete({ where: { id } as any });
  }
}
