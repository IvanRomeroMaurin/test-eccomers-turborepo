import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductVariantsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.product_variants.findMany({
      include: {
        variant_attributes: {
          include: {
            attribute_values: {
              include: {
                attribute_types: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.product_variants.findUnique({
      where: { id },
      include: {
        variant_attributes: {
          include: {
            attribute_values: {
              include: {
                attribute_types: true,
              },
            },
          },
        },
      },
    });
    if (!record) throw new NotFoundException(`ProductVariant #${id} not found`);
    return record;
  }

  create(dto: CreateProductVariantDto) {
    return this.prisma.product_variants.create({
      data: dto as any,
    });
  }

  async update(id: number, dto: UpdateProductVariantDto) {
    await this.findOne(id);
    return this.prisma.product_variants.update({
      where: { id },
      data: dto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product_variants.delete({
      where: { id },
    });
  }
}
