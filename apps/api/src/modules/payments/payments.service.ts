import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(includeInactive = false) {
    return this.prisma.payments.findMany({
      where: includeInactive ? {} : { is_active: true }
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.payments.findUnique({ where: { id } });
    if (!record || !record.is_active) throw new NotFoundException(`Payment #${id} not found`);
    return record;
  }

  async findOneAdmin(id: number) {
    const record = await this.prisma.payments.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Payment #${id} not found`);
    return record;
  }

  create(dto: CreatePaymentDto) {
    return this.prisma.payments.create({ data: { ...dto, is_active: true } as any });
  }

  async update(id: number, dto: UpdatePaymentDto) {
    await this.findOneAdmin(id);
    return this.prisma.payments.update({ where: { id }, data: dto as any });
  }

  async remove(id: number) {
    await this.findOneAdmin(id);
    return this.prisma.payments.update({
      where: { id },
      data: { is_active: false }
    });
  }

  async restore(id: number) {
    const record = await this.prisma.payments.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Payment #${id} not found`);
    return this.prisma.payments.update({
      where: { id },
      data: { is_active: true }
    });
  }
}
