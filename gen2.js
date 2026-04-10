const fs = require('fs');
const path = require('path');

const models = [
  { 
    name: 'postal-codes', singular: 'postal-code', typeName: 'PostalCode', idType: 'number', modelDb: 'postal_codes',
    dtoFields: `@IsNotEmpty()\n  @IsString()\n  code: string;`
  },
  { 
    name: 'addresses', singular: 'address', typeName: 'Address', idType: 'number',
    dtoFields: `@IsNotEmpty()\n  @IsString()\n  user_id: string;\n\n  @IsNotEmpty()\n  @IsString()\n  address_line: string;\n\n  @IsNotEmpty()\n  @IsNumber()\n  city_id: number;\n\n  @IsNotEmpty()\n  @IsNumber()\n  postal_code_id: number;\n\n  @IsOptional()\n  @IsBoolean()\n  is_default: boolean | null;`
  },
  { 
    name: 'payment-methods', singular: 'payment-method', typeName: 'PaymentMethod', idType: 'number', modelDb: 'payment_methods',
    dtoFields: `@IsNotEmpty()\n  @IsString()\n  name: string;`
  },
  { 
    name: 'payment-statuses', singular: 'payment-status', typeName: 'PaymentStatus', idType: 'number', modelDb: 'payment_statuses',
    dtoFields: `@IsNotEmpty()\n  @IsString()\n  name: string;`
  }
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
`import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ${className} } from '@repo/types';

export class Create${className}Dto implements Omit<${className}, 'id'> {
  ${model.dtoFields}
}
`);

  // update-dto
  fs.writeFileSync(path.join(dtoDir, `update-${model.singular}.dto.ts`), 
`import { PartialType } from '@nestjs/mapped-types';
import { Create${className}Dto } from './create-${model.singular}.dto';

export class Update${className}Dto extends PartialType(Create${className}Dto) {}
`);

  const moduleClassName = className === 'Address' ? 'AddressesModule' : `${className}sModule`;
  const controllerClassName = className === 'Address' ? 'AddressesController' : `${className}sController`;
  const serviceClassName = className === 'Address' ? 'AddressesService' : `${className}sService`;

  // service
  fs.writeFileSync(path.join(modDir, `${model.name}.service.ts`), 
`import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Create${className}Dto } from './dto/create-${model.singular}.dto';
import { Update${className}Dto } from './dto/update-${model.singular}.dto';

@Injectable()
export class ${serviceClassName} {
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
    return this.prisma.${dbName}.create({ data: Object.assign({}, dto) as any });
  }

  async update(id: ${model.idType === 'bigint' ? 'bigint' : 'number'}, dto: Update${className}Dto) {
    await this.findOne(id);
    return this.prisma.${dbName}.update({ where: { id } as any, data: Object.assign({}, dto) as any });
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
import { ${serviceClassName} } from './${model.name}.service';
import { Create${className}Dto } from './dto/create-${model.singular}.dto';
import { Update${className}Dto } from './dto/update-${model.singular}.dto';

@Controller('${model.name.replace('-', '_')}')
export class ${controllerClassName} {
  constructor(private readonly service: ${serviceClassName}) {}

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
  
  fs.writeFileSync(path.join(modDir, `${model.name}.module.ts`), 
`import { Module } from '@nestjs/common';
import { ${serviceClassName} } from './${model.name}.service';
import { ${controllerClassName} } from './${model.name}.controller';

@Module({
  controllers: [${controllerClassName}],
  providers: [${serviceClassName}],
  exports: [${serviceClassName}],
})
export class ${moduleClassName} {}
`);
});

// Update OrderShippings DTO
fs.writeFileSync(path.join(basePath, 'order-shippings/dto/create-order-shipping.dto.ts'),
`import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderShipping } from '@repo/types';

export class CreateOrderShippingDto implements Omit<OrderShipping, 'id'> {
  @IsNotEmpty()
  order_id: bigint;

  @IsNotEmpty()
  @IsString()
  recipient_name: string;

  @IsNotEmpty()
  @IsNumber()
  address_id: number;

  @IsOptional()
  @IsString()
  notes: string | null;
}
`);

// Update Payments DTO
fs.writeFileSync(path.join(basePath, 'payments/dto/create-payment.dto.ts'),
`import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Payment } from '@repo/types';

export class CreatePaymentDto implements Omit<Payment, 'id' | 'created_at'> {
  @IsNotEmpty()
  order_id: bigint;

  @IsNotEmpty()
  @IsNumber()
  method_id: number;

  @IsNotEmpty()
  @IsNumber()
  status_id: number;

  @IsOptional()
  @IsString()
  external_id: string | null;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
`);

console.log('Modules generated successfully.');
