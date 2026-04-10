import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiResponse } from '@nestjs/swagger'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'

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
}
