import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.orders.findMany();
  }

  async findOne(id: bigint) {
    const record = await this.prisma.orders.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`Order #${id} not found`);
    return record;
  }

  create(dto: CreateOrderDto) {
    return this.prisma.orders.create({ data: dto as any });
  }

  async update(id: bigint, dto: UpdateOrderDto) {
    await this.findOne(id);
    return this.prisma.orders.update({ where: { id } as any, data: dto as any });
  }

  async remove(id: bigint) {
    await this.findOne(id);
    return this.prisma.orders.delete({ where: { id } as any });
  }
}
