import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
import { ApiResponse } from '@nestjs/swagger'
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { Review } from './entities/review.entity'

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  // PÚBLICO — reseñas de un producto
  @Get()
  @ApiQuery({ name: 'productId', required: true, description: 'ID del producto' })
  @ApiResponse({ status: 200, type: Review, isArray: true })
  findByProduct(@Query('productId') productId: string) {
    return this.service.findByProduct(Number(productId))
  }

  // PROTEGIDO — crear reseña
  @Post()
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: Review })
  create(
    @Body() dto: CreateReviewDto,
    @CurrentUser() user: { id: string }
  ) {
    return this.service.create(dto, user.id)
  }

  // PROTEGIDO — eliminar reseña propia
  @Delete(':id')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  remove(
    @Param('id') id: string,
    @CurrentUser() user: { id: string }
  ) {
    return this.service.remove(Number(id), user.id)
  }
}
