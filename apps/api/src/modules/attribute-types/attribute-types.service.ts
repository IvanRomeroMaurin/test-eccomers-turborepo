import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAttributeTypeDto } from './dto/create-attribute-type.dto';
import { UpdateAttributeTypeDto } from './dto/update-attribute-type.dto';

@Injectable()
export class AttributeTypesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.attribute_types.findMany({
      include: {
        attribute_values: true,
      },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.attribute_types.findUnique({
      where: { id },
      include: {
        attribute_values: true,
      },
    });
    if (!record) throw new NotFoundException(`AttributeType #${id} not found`);
    return record;
  }

  create(dto: CreateAttributeTypeDto) {
    return this.prisma.attribute_types.create({
      data: dto as any,
    });
  }

  async update(id: number, dto: UpdateAttributeTypeDto) {
    await this.findOne(id);
    return this.prisma.attribute_types.update({
      where: { id },
      data: dto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.attribute_types.delete({
      where: { id },
    });
  }
}
