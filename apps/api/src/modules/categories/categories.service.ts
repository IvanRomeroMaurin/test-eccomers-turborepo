import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.categories.findMany({
      orderBy: { name: 'asc' }
    })
  }

  async findOne(id: number) {
    const record = await this.prisma.categories.findUnique({
      where: { id }
    })
    if (!record) throw new NotFoundException(`Category #${id} not found`)
    return record
  }

  findBySlug(slug: string) {
    return this.prisma.categories.findUnique({
      where: { slug }
    })
  }

  create(dto: CreateCategoryDto) {
    return this.prisma.categories.create({ data: dto as any })
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.findOne(id)
    return this.prisma.categories.update({
      where: { id },
      data: dto as any
    })
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prisma.categories.delete({ where: { id } })
  }
}
