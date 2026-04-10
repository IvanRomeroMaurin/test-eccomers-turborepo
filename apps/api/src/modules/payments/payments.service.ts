import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.payments.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.payments.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`Payment #${id} not found`);
    return record;
  }

  create(dto: CreatePaymentDto) {
    return this.prisma.payments.create({ data: dto as any });
  }

  async update(id: number, dto: UpdatePaymentDto) {
    await this.findOne(id);
    return this.prisma.payments.update({ where: { id } as any, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.payments.delete({ where: { id } as any });
  }
}
