import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  // Público: solo activas
  findAll() {
    return this.prisma.orders.findMany({
      where: { is_active: true }
    });
  }

  // Admin: todas
  findAllAdmin(includeInactive = false) {
    return this.prisma.orders.findMany({
      where: includeInactive ? {} : { is_active: true },
      include: {
        users: { select: { id: true, email: true, name: true } },
        order_statuses: true
      },
      orderBy: { created_at: 'desc' }
    })
  }

  // Búsqueda para usuario (solo si es activa)
  async findOne(id: bigint, userId?: string) {
    const record = await this.prisma.orders.findUnique({
      where: { id } as any,
      include: {
        order_items: true,
        order_shippings: { include: { addresses: true } }
      }
    });
    if (!record || !record.is_active) throw new NotFoundException(`Order #${id} not found`);
    if (userId && record.user_id !== userId) throw new ForbiddenException('No tienes acceso a esta orden');
    return record;
  }

  // Búsqueda para admin (activa o inactiva)
  async findOneAdmin(id: bigint) {
    const record = await this.prisma.orders.findUnique({
      where: { id } as any,
      include: {
        order_items: true,
        order_shippings: true,
        users: { select: { id: true, email: true } }
      }
    });
    if (!record) throw new NotFoundException(`Order #${id} not found`);
    return record;
  }

  create(dto: CreateOrderDto) {
    return this.prisma.orders.create({ data: dto as any });
  }

  async update(id: bigint, dto: UpdateOrderDto) {
    await this.findOneAdmin(id);
    return this.prisma.orders.update({ where: { id } as any, data: dto as any });
  }

  // Soft delete
  async remove(id: bigint) {
    await this.findOneAdmin(id);
    return this.prisma.orders.update({
      where: { id } as any,
      data: { is_active: false }
    });
  }

  // Reactivar
  async restore(id: bigint) {
    const record = await this.prisma.orders.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`Order #${id} not found`);
    if (record.is_active) throw new BadRequestException(`Order #${id} is already active`);
    return this.prisma.orders.update({
      where: { id } as any,
      data: { is_active: true }
    })
  }
}
