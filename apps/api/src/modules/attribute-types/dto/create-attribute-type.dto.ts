import { ApiProperty } from '@nestjs/swagger';

export class CreateAttributeTypeDto {
  @ApiProperty({ example: 'Color' })
  name: string;

  @ApiProperty({ example: 'color' })
  slug: string;

  @ApiProperty({ example: 'products', required: false })
  applies_to?: string;
}
