import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(categorySlug?: string) {
    return this.prisma.products.findMany({
      where: categorySlug
        ? { categories: { slug: categorySlug } }
        : undefined,
      include: {
        categories: true,
        product_variants: {
          include: {
            variant_attributes: {
              include: {
                attribute_values: {
                  include: {
                    attribute_types: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })
  }

  async findOne(id: number) {
    const record = await this.prisma.products.findUnique({
      where: { id },
      include: {
        categories: true,
        product_variants: {
          include: {
            variant_attributes: {
              include: {
                attribute_values: {
                  include: {
                    attribute_types: true
                  }
                }
              }
            }
          }
        }
      }
    })
    if (!record) throw new NotFoundException(`Product #${id} not found`)
    return record
  }


  create(dto: CreateProductDto) {
    return this.prisma.products.create({ data: dto as any })
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id)
    return this.prisma.products.update({ where: { id }, data: dto as any })
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prisma.products.delete({ where: { id } })
  }
}
