import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.categories.findMany({
      orderBy: { name: 'asc' }
    })
  }

  findBySlug(slug: string) {
    return this.prisma.categories.findUnique({
      where: { slug }
    })
  }
}
