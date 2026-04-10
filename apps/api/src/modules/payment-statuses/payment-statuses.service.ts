import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentStatusDto } from './dto/create-payment-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

@Injectable()
export class PaymentStatussService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.payment_statuses.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.payment_statuses.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`PaymentStatus #${id} not found`);
    return record;
  }

  create(dto: CreatePaymentStatusDto) {
    return this.prisma.payment_statuses.create({ data: Object.assign({}, dto) as any });
  }

  async update(id: number, dto: UpdatePaymentStatusDto) {
    await this.findOne(id);
    return this.prisma.payment_statuses.update({ where: { id } as any, data: Object.assign({}, dto) as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.payment_statuses.delete({ where: { id } as any });
  }
}
