import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId?: string) {
    return this.prisma.addresses.findMany({
      where: {
        is_active: true,
        ...(userId ? { user_id: userId } : {})
      }
    });
  }

  async findOne(id: number, userId?: string) {
    const record = await this.prisma.addresses.findUnique({ where: { id } });
    if (!record || !record.is_active) throw new NotFoundException(`Address #${id} not found`);
    if (userId && record.user_id !== userId) throw new NotFoundException(`Address #${id} not found`);
    return record;
  }

  create(dto: CreateAddressDto) {
    return this.prisma.addresses.create({ data: { ...dto, is_active: true } as any });
  }

  async update(id: number, dto: UpdateAddressDto, userId?: string) {
    await this.findOne(id, userId);
    return this.prisma.addresses.update({ where: { id }, data: dto as any });
  }

  async remove(id: number, userId?: string) {
    await this.findOne(id, userId);
    return this.prisma.addresses.update({
      where: { id },
      data: { is_active: false }
    });
  }

  async restore(id: number) {
    const record = await this.prisma.addresses.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Address #${id} not found`);
    return this.prisma.addresses.update({
      where: { id },
      data: { is_active: true }
    });
  }
}
