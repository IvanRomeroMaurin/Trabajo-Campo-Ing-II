import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // Endpoint público: solo productos activos
  findAll(categorySlug?: string) {
    return this.prisma.products.findMany({
      where: {
        is_active: true,
        ...(categorySlug ? { categories: { slug: categorySlug } } : {})
      },
      include: {
        categories: true,
        product_variants: {
          where: { is_active: true },
          include: {
            variant_attributes: {
              include: {
                attribute_values: { include: { attribute_types: true } }
              }
            }
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })
  }

  // Endpoint público: lanza 404 si no existe o está inactivo
  async findOne(id: number) {
    const record = await this.prisma.products.findUnique({
      where: { id },
      include: {
        categories: true,
        product_variants: {
          where: { is_active: true },
          include: {
            variant_attributes: {
              include: {
                attribute_values: { include: { attribute_types: true } }
              }
            }
          }
        }
      }
    })
    if (!record || !record.is_active) {
      throw new NotFoundException(`Product #${id} not found`)
    }
    return record
  }

  // Admin: ve todos, activos e inactivos
  findAllAdmin(includeInactive = false) {
    return this.prisma.products.findMany({
      where: includeInactive ? {} : { is_active: true },
      include: {
        categories: true,
        product_variants: {
          include: {
            variant_attributes: {
              include: {
                attribute_values: { include: { attribute_types: true } }
              }
            }
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })
  }

  // Admin: ve el producto aunque esté inactivo
  async findOneAdmin(id: number) {
    const record = await this.prisma.products.findUnique({
      where: { id },
      include: {
        categories: true,
        product_variants: {
          include: {
            variant_attributes: {
              include: {
                attribute_values: { include: { attribute_types: true } }
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
    await this.findOneAdmin(id)
    return this.prisma.products.update({ where: { id }, data: dto as any })
  }

  // Borrado lógico
  async remove(id: number) {
    await this.findOneAdmin(id)
    return this.prisma.products.update({
      where: { id },
      data: { is_active: false }
    })
  }

  // Reactivar
  async restore(id: number) {
    const record = await this.prisma.products.findUnique({ where: { id } })
    if (!record) throw new NotFoundException(`Product #${id} not found`)
    if (record.is_active) throw new BadRequestException(`Product #${id} is already active`)
    return this.prisma.products.update({
      where: { id },
      data: { is_active: true }
    })
  }
}
