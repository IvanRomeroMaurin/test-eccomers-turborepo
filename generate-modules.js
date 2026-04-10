const fs = require('fs');
const path = require('path');

const models = [
  { name: 'products', singular: 'product', typeName: 'Product', idType: 'number' },
  { name: 'product-stocks', singular: 'product-stock', typeName: 'ProductStock', idType: 'number', modelDb: 'product_stocks' },
  { name: 'provinces', singular: 'province', typeName: 'Province', idType: 'number' },
  { name: 'cities', singular: 'city', typeName: 'City', idType: 'number' },
  { name: 'orders', singular: 'order', typeName: 'Order', idType: 'bigint' },
  { name: 'order-items', singular: 'order-item', typeName: 'OrderItem', idType: 'number', modelDb: 'order_items' },
  { name: 'order-shippings', singular: 'order-shipping', typeName: 'OrderShipping', idType: 'number', modelDb: 'order_shippings' },
  { name: 'payments', singular: 'payment', typeName: 'Payment', idType: 'number' },
  { name: 'reviews', singular: 'review', typeName: 'Review', idType: 'number' }
];

const basePath = path.join(__dirname, 'apps/api/src/modules');

models.forEach(model => {
  const modDir = path.join(basePath, model.name);
  const dtoDir = path.join(modDir, 'dto');
  fs.mkdirSync(dtoDir, { recursive: true });
  
  const className = model.typeName;
  const dbName = model.modelDb || model.name;
  
  // create-dto
  fs.writeFileSync(path.join(dtoDir, `create-${model.singular}.dto.ts`), 
`import { IsNotEmpty, IsOptional } from 'class-validator';
import { ${className} } from '@repo/types';

export class Create${className}Dto implements Omit<${className}, 'id' | 'created_at'> {
  [key: string]: any; // To bypass complete implementation for this code gen
}
`);

  // update-dto
  fs.writeFileSync(path.join(dtoDir, `update-${model.singular}.dto.ts`), 
`import { PartialType } from '@nestjs/mapped-types';
import { Create${className}Dto } from './create-${model.singular}.dto';

export class Update${className}Dto extends PartialType(Create${className}Dto) {}
`);

  // service
  fs.writeFileSync(path.join(modDir, `${model.name}.service.ts`), 
`import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Create${className}Dto } from './dto/create-${model.singular}.dto';
import { Update${className}Dto } from './dto/update-${model.singular}.dto';

@Injectable()
export class ${className}sService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.${dbName}.findMany();
  }

  async findOne(id: ${model.idType === 'bigint' ? 'bigint' : 'number'}) {
    const record = await this.prisma.${dbName}.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(\`${className} #\${id} not found\`);
    return record;
  }

  create(dto: Create${className}Dto) {
    return this.prisma.${dbName}.create({ data: dto as any });
  }

  async update(id: ${model.idType === 'bigint' ? 'bigint' : 'number'}, dto: Update${className}Dto) {
    await this.findOne(id);
    return this.prisma.${dbName}.update({ where: { id } as any, data: dto as any });
  }

  async remove(id: ${model.idType === 'bigint' ? 'bigint' : 'number'}) {
    await this.findOne(id);
    return this.prisma.${dbName}.delete({ where: { id } as any });
  }
}
`);

  // controller
  fs.writeFileSync(path.join(modDir, `${model.name}.controller.ts`), 
`import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ${className}sService } from './${model.name}.service';
import { Create${className}Dto } from './dto/create-${model.singular}.dto';
import { Update${className}Dto } from './dto/update-${model.singular}.dto';

@Controller('${model.name.replace('-', '_')}')
export class ${className}sController {
  constructor(private readonly service: ${className}sService) {}

  @Post()
  create(@Body() dto: Create${className}Dto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(${model.idType === 'bigint' ? 'BigInt(id)' : 'Number(id)'});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Update${className}Dto) {
    return this.service.update(${model.idType === 'bigint' ? 'BigInt(id)' : 'Number(id)'}, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(${model.idType === 'bigint' ? 'BigInt(id)' : 'Number(id)'});
  }
}
`);

  // module
  fs.writeFileSync(path.join(modDir, `${model.name}.module.ts`), 
`import { Module } from '@nestjs/common';
import { ${className}sService } from './${model.name}.service';
import { ${className}sController } from './${model.name}.controller';

@Module({
  controllers: [${className}sController],
  providers: [${className}sService],
  exports: [${className}sService],
})
export class ${className}sModule {}
`);
});

console.log('Modules generated successfully.');
