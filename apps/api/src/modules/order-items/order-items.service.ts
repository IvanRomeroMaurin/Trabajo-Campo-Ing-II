import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(includeInactive = false) {
    return this.prisma.order_items.findMany({
      where: includeInactive ? {} : { is_active: true }
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.order_items.findUnique({ where: { id } });
    if (!record || !record.is_active) throw new NotFoundException(`OrderItem #${id} not found`);
    return record;
  }

  async findOneAdmin(id: number) {
    const record = await this.prisma.order_items.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`OrderItem #${id} not found`);
    return record;
  }

  create(dto: CreateOrderItemDto) {
    return this.prisma.order_items.create({ data: { ...dto, is_active: true } as any });
  }

  async update(id: number, dto: UpdateOrderItemDto) {
    await this.findOneAdmin(id);
    return this.prisma.order_items.update({ where: { id }, data: dto as any });
  }

  async remove(id: number) {
    await this.findOneAdmin(id);
    return this.prisma.order_items.update({
      where: { id },
      data: { is_active: false }
    });
  }

  async restore(id: number) {
    const record = await this.prisma.order_items.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`OrderItem #${id} not found`);
    return this.prisma.order_items.update({
      where: { id },
      data: { is_active: true }
    });
  }
}
