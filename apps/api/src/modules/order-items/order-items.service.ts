import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.order_items.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.order_items.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`OrderItem #${id} not found`);
    return record;
  }

  create(dto: CreateOrderItemDto) {
    return this.prisma.order_items.create({ data: dto as any });
  }

  async update(id: number, dto: UpdateOrderItemDto) {
    await this.findOne(id);
    return this.prisma.order_items.update({ where: { id } as any, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.order_items.delete({ where: { id } as any });
  }
}
