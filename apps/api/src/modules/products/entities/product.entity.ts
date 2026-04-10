import { ApiProperty } from '@nestjs/swagger';
import { Product as ProductInterface } from '@repo/types';

export class Product implements ProductInterface {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Product Name' })
  name: string;

  @ApiProperty({ example: 99.99 })
  price: number;

  @ApiProperty({ example: 'https://example.com/image.png', nullable: true, type: () => String })
  image: string | null;

  @ApiProperty({ example: 'Product description...', nullable: true, type: () => String })
  description: string | null;

  @ApiProperty({ example: '2026-04-10T05:27:56.077Z', nullable: true, type: () => String })
  created_at: Date | null;
}
