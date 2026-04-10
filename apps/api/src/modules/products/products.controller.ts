import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
import { ApiResponse } from '@nestjs/swagger'
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  @ApiQuery({ name: 'category', required: false, description: 'Filtrar por slug de categoría' })
  @ApiResponse({ status: 200, type: Product, isArray: true })
  findAll(@Query('category') category?: string) {
    return this.service.findAll(category)
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Product })
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id))
  }

  @Post()
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto)
  }

  @Patch(':id')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(Number(id), dto)
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id))
  }
}
