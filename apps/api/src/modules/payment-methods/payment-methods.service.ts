import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.payment_methods.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.payment_methods.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`PaymentMethod #${id} not found`);
    return record;
  }

  create(dto: CreatePaymentMethodDto) {
    return this.prisma.payment_methods.create({ data: Object.assign({}, dto) as any });
  }

  async update(id: number, dto: UpdatePaymentMethodDto) {
    await this.findOne(id);
    return this.prisma.payment_methods.update({ where: { id } as any, data: Object.assign({}, dto) as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.payment_methods.delete({ where: { id } as any });
  }
}
