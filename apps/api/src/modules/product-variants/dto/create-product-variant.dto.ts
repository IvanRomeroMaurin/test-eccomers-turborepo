import { ApiProperty } from '@nestjs/swagger';

export class CreateProductVariantDto {
  @ApiProperty({ example: 1 })
  product_id: number;

  @ApiProperty({ example: 'SKU-001', required: false })
  sku?: string;

  @ApiProperty({ example: 0, required: false })
  price_modifier?: number;

  @ApiProperty({ example: 10 })
  stock: number;

  @ApiProperty({ example: true, required: false })
  is_active?: boolean;
}
