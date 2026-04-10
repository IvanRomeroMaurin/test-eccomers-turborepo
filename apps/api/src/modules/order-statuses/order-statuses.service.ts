import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrderStatusesModule {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.order_statuses.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.order_statuses.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`OrderStatus #${id} not found`);
    return record;
  }

  create(dto: CreateOrderStatusDto) {
    return this.prisma.order_statuses.create({ data: dto });
  }

  async update(id: number, dto: UpdateOrderStatusDto) {
    await this.findOne(id);
    return this.prisma.order_statuses.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.order_statuses.delete({ where: { id } });
  }
}
