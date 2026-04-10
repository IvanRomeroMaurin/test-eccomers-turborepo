import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderShippingDto } from './dto/create-order-shipping.dto';
import { UpdateOrderShippingDto } from './dto/update-order-shipping.dto';

@Injectable()
export class OrderShippingsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.order_shippings.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.order_shippings.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`OrderShipping #${id} not found`);
    return record;
  }

  create(dto: CreateOrderShippingDto) {
    return this.prisma.order_shippings.create({ data: dto as any });
  }

  async update(id: number, dto: UpdateOrderShippingDto) {
    await this.findOne(id);
    return this.prisma.order_shippings.update({ where: { id } as any, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.order_shippings.delete({ where: { id } as any });
  }
}
