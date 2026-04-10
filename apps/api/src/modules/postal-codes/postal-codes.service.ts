import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostalCodeDto } from './dto/create-postal-code.dto';
import { UpdatePostalCodeDto } from './dto/update-postal-code.dto';

@Injectable()
export class PostalCodesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.postal_codes.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.postal_codes.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`PostalCode #${id} not found`);
    return record;
  }

  create(dto: CreatePostalCodeDto) {
    return this.prisma.postal_codes.create({ data: Object.assign({}, dto) as any });
  }

  async update(id: number, dto: UpdatePostalCodeDto) {
    await this.findOne(id);
    return this.prisma.postal_codes.update({ where: { id } as any, data: Object.assign({}, dto) as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.postal_codes.delete({ where: { id } as any });
  }
}
