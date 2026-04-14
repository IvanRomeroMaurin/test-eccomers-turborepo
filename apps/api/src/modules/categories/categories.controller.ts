import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { ApiResponse } from '@nestjs/swagger'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  @ApiResponse({ status: 200, type: Category, isArray: true })
  findAll() {
    return this.service.findAll()
  }

  @Get(':slug')
  @ApiResponse({ status: 200, type: Category })
  findOne(@Param('slug') slug: string) {
    return this.service.findBySlug(slug)
  }

  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: Category })
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto)
  }

  @Patch(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Category })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.service.update(Number(id), dto)
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id))
  }
}
