import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateReviewDto } from './dto/create-review.dto'

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener reseñas por producto (público)
  findByProduct(productId: number) {
    return this.prisma.reviews.findMany({
      where: { product_id: productId },
      include: {
        users: {
          select: { id: true, name: true }
        }
      },
      orderBy: { created_at: 'desc' }
    })
  }

  // Verificar si el usuario ya reseñó el producto
  async findUserReview(productId: number, userId: string) {
    return this.prisma.reviews.findUnique({
      where: {
        product_id_user_id: {
          product_id: productId,
          user_id: userId
        }
      }
    })
  }

  // Crear reseña (user_id viene del JWT)
  async create(dto: CreateReviewDto, userId: string) {
    const existing = await this.findUserReview(dto.product_id, userId)
    if (existing) {
      throw new ConflictException('Ya reseñaste este producto')
    }
    return this.prisma.reviews.create({
      data: {
        product_id: dto.product_id,
        user_id: userId,
        rating: dto.rating,
        comment: dto.comment ?? null,
      },
      include: {
        users: {
          select: { id: true, name: true }
        }
      }
    })
  }

  // Eliminar reseña (solo el autor)
  async remove(id: number, userId: string) {
    const review = await this.prisma.reviews.findUnique({ where: { id } })
    if (!review) throw new NotFoundException(`Review #${id} not found`)
    if (review.user_id !== userId) {
      throw new NotFoundException(`Review #${id} not found`)
    }
    return this.prisma.reviews.delete({ where: { id } })
  }
}
