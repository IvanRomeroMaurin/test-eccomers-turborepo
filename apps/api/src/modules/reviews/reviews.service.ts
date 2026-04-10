import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.reviews.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.reviews.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`Review #${id} not found`);
    return record;
  }

  create(dto: CreateReviewDto) {
    return this.prisma.reviews.create({ data: dto as any });
  }

  async update(id: number, dto: UpdateReviewDto) {
    await this.findOne(id);
    return this.prisma.reviews.update({ where: { id } as any, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.reviews.delete({ where: { id } as any });
  }
}
