import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.addresses.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.addresses.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`Address #${id} not found`);
    return record;
  }

  create(dto: CreateAddressDto) {
    return this.prisma.addresses.create({ data: Object.assign({}, dto) as any });
  }

  async update(id: number, dto: UpdateAddressDto) {
    await this.findOne(id);
    return this.prisma.addresses.update({ where: { id } as any, data: Object.assign({}, dto) as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.addresses.delete({ where: { id } as any });
  }
}
