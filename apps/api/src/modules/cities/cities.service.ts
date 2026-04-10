import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitysService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.cities.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.cities.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`City #${id} not found`);
    return record;
  }

  create(dto: CreateCityDto) {
    return this.prisma.cities.create({ data: dto as any });
  }

  async update(id: number, dto: UpdateCityDto) {
    await this.findOne(id);
    return this.prisma.cities.update({ where: { id } as any, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.cities.delete({ where: { id } as any });
  }
}
