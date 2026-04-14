import { Injectable, NotFoundException, ConflictException, BadRequestException, ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateReviewDto } from './dto/create-review.dto'

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  // Público: solo activas
  findByProduct(productId: number) {
    return this.prisma.reviews.findMany({
      where: { product_id: productId, is_active: true },
      include: {
        users: {
          select: { id: true, name: true }
        }
      },
      orderBy: { created_at: 'desc' }
    })
  }

  async findOne(id: number) {
    const record = await this.prisma.reviews.findUnique({
      where: { id },
      include: { users: { select: { id: true, name: true } } }
    })
    if (!record || !record.is_active) {
      throw new NotFoundException(`Review #${id} not found`)
    }
    return record
  }

  // Admin: todas
  findAllAdmin(includeInactive = false) {
    return this.prisma.reviews.findMany({
      where: includeInactive ? {} : { is_active: true },
      include: {
        users: { select: { id: true, name: true } },
        products: { select: { id: true, name: true } }
      },
      orderBy: { created_at: 'desc' }
    })
  }

  // Admin / User findOne
  async findOneAdmin(id: number) {
    const record = await this.prisma.reviews.findUnique({ where: { id } })
    if (!record) throw new NotFoundException(`Review #${id} not found`)
    return record
  }

  // Verificar si el usuario ya reseñó el producto
  async findUserReview(productId: number, userId: string) {
    return this.prisma.reviews.findUnique({
      where: {
        product_id_user_id: {
          product_id: productId,
          user_id: userId
        }
      }
    })
  }

  async create(dto: CreateReviewDto, userId: string) {
    const existing = await this.findUserReview(dto.product_id, userId)
    if (existing) {
      throw new ConflictException('Ya reseñaste este producto')
    }
    return this.prisma.reviews.create({
      data: {
        product_id: dto.product_id,
        user_id: userId,
        rating: dto.rating,
        comment: dto.comment ?? null,
      },
      include: {
        users: {
          select: { id: true, name: true }
        }
      }
    })
  }

  // Soft delete (solo el autor o admin)
  async remove(id: number, userId: string, isAdmin = false) {
    const review = await this.findOneAdmin(id)
    if (!isAdmin && review.user_id !== userId) {
      throw new ForbiddenException('No tienes permiso para borrar esta reseña')
    }
    return this.prisma.reviews.update({
      where: { id },
      data: { is_active: false }
    })
  }

  async restore(id: number) {
    const review = await this.findOneAdmin(id)
    if (review.is_active) throw new BadRequestException(`Review #${id} is already active`)
    return this.prisma.reviews.update({
      where: { id },
      data: { is_active: true }
    })
  }
}
