import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@Injectable()
export class ProvincesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.provinces.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.provinces.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`Province #${id} not found`);
    return record;
  }

  create(dto: CreateProvinceDto) {
    return this.prisma.provinces.create({ data: dto as any });
  }

  async update(id: number, dto: UpdateProvinceDto) {
    await this.findOne(id);
    return this.prisma.provinces.update({ where: { id } as any, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.provinces.delete({ where: { id } as any });
  }
}
