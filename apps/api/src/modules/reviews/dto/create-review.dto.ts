import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateReviewDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  product_id: number

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number

  @ApiPropertyOptional({ example: 'Excelente producto' })
  @IsOptional()
  @IsString()
  comment?: string | null
}
