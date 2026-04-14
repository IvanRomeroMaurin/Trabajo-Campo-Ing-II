import { ApiProperty } from '@nestjs/swagger'
import { Category as CategoryInterface } from '@repo/types'

export class Category implements CategoryInterface {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'Remeras' })
  name: string

  @ApiProperty({ example: 'remeras' })
  slug: string

  @ApiProperty({ example: 'Remeras y camisetas', nullable: true, type: () => String })
  description: string | null

  @ApiProperty({ example: '2026-04-10T00:00:00.000Z', nullable: true, type: () => String })
  created_at: Date | null

  @ApiProperty({ example: true })
  is_active: boolean
}
