import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostalCodesService } from './postal-codes.service';
import { CreatePostalCodeDto } from './dto/create-postal-code.dto';
import { UpdatePostalCodeDto } from './dto/update-postal-code.dto';

@Controller('postal_codes')
export class PostalCodesController {
  constructor(private readonly service: PostalCodesService) {}

  @Post()
  create(@Body() dto: CreatePostalCodeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostalCodeDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
