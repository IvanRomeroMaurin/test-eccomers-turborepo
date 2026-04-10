import { ApiProperty } from '@nestjs/swagger'
import { Product as ProductInterface } from '@repo/types'

export class ProductStock {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'M' })
  size: string

  @ApiProperty({ example: 10 })
  quantity: number
}

export class ProductCategory {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'Remeras' })
  name: string

  @ApiProperty({ example: 'remeras' })
  slug: string
}

export class Product implements ProductInterface {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'Remera Técnica Elite' })
  name: string

  @ApiProperty({ example: 25.99 })
  price: number

  @ApiProperty({ example: 'https://example.com/image.png', nullable: true, type: () => String })
  image: string | null

  @ApiProperty({ example: 'Descripción del producto', nullable: true, type: () => String })
  description: string | null

  @ApiProperty({ example: 1 })
  category_id: number

  @ApiProperty({ example: '2026-04-10T00:00:00.000Z', nullable: true, type: () => String })
  created_at: Date | null

  @ApiProperty({ type: () => ProductCategory, nullable: true })
  categories?: ProductCategory | null

  @ApiProperty({ type: () => [ProductStock] })
  product_stocks?: ProductStock[]
}
