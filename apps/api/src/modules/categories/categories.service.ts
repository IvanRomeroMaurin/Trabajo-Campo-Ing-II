import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  // Público: solo activas
  findAll() {
    return this.prisma.categories.findMany({
      where: { is_active: true },
      orderBy: { name: 'asc' }
    })
  }

  async findOne(id: number) {
    const record = await this.prisma.categories.findUnique({
      where: { id }
    })
    if (!record || !record.is_active) {
      throw new NotFoundException(`Category #${id} not found`)
    }
    return record
  }

  findBySlug(slug: string) {
    return this.prisma.categories.findFirst({
      where: { slug, is_active: true }
    })
  }

  // Admin: todas, con filtro opcional
  findAllAdmin(includeInactive = false) {
    return this.prisma.categories.findMany({
      where: includeInactive ? {} : { is_active: true },
      orderBy: { name: 'asc' }
    })
  }

  async findOneAdmin(id: number) {
    const record = await this.prisma.categories.findUnique({ where: { id } })
    if (!record) throw new NotFoundException(`Category #${id} not found`)
    return record
  }

  create(dto: CreateCategoryDto) {
    return this.prisma.categories.create({ data: dto as any })
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.findOneAdmin(id)
    return this.prisma.categories.update({
      where: { id },
      data: dto as any
    })
  }

  // Borrado lógico
  async remove(id: number) {
    await this.findOneAdmin(id)
    return this.prisma.categories.update({
      where: { id },
      data: { is_active: false }
    })
  }

  // Reactivar
  async restore(id: number) {
    const record = await this.prisma.categories.findUnique({ where: { id } })
    if (!record) throw new NotFoundException(`Category #${id} not found`)
    if (record.is_active) throw new BadRequestException(`Category #${id} is already active`)
    return this.prisma.categories.update({
      where: { id },
      data: { is_active: true }
    })
  }
}
