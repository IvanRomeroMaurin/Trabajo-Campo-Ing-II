import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAttributeTypeDto } from './dto/create-attribute-type.dto';
import { UpdateAttributeTypeDto } from './dto/update-attribute-type.dto';

@Injectable()
export class AttributeTypesService {
  constructor(private readonly prisma: PrismaService) {}

  // Público
  findAll() {
    return this.prisma.attribute_types.findMany({
      where: { is_active: true },
      include: {
        attribute_values: {
          where: { is_active: true },
          orderBy: { display_order: 'asc' }
        }
      },
      orderBy: { name: 'asc' }
    })
  }

  async findOne(id: number) {
    const record = await this.prisma.attribute_types.findUnique({
      where: { id },
      include: {
        attribute_values: {
          where: { is_active: true },
        },
      },
    });
    if (!record || !record.is_active) {
      throw new NotFoundException(`AttributeType #${id} not found`);
    }
    return record;
  }

  // Admin: todos los tipos con todos sus valores
  findAllAdmin(includeInactive = false) {
    return this.prisma.attribute_types.findMany({
      where: includeInactive ? {} : { is_active: true },
      include: {
        attribute_values: { orderBy: { display_order: 'asc' } }
      },
      orderBy: { name: 'asc' }
    })
  }

  async findOneAdmin(id: number) {
    const record = await this.prisma.attribute_types.findUnique({
      where: { id },
      include: {
        attribute_values: true,
      },
    });
    if (!record) throw new NotFoundException(`AttributeType #${id} not found`);
    return record;
  }

  create(dto: CreateAttributeTypeDto) {
    return this.prisma.attribute_types.create({
      data: dto as any,
    });
  }

  async update(id: number, dto: UpdateAttributeTypeDto) {
    await this.findOneAdmin(id);
    return this.prisma.attribute_types.update({
      where: { id },
      data: dto as any,
    });
  }

  async remove(id: number) {
    await this.findOneAdmin(id);
    return this.prisma.attribute_types.update({
      where: { id },
      data: { is_active: false }
    })
  }

  async restore(id: number) {
    const record = await this.prisma.attribute_types.findUnique({ where: { id } })
    if (!record) throw new NotFoundException(`AttributeType #${id} not found`)
    if (record.is_active) throw new BadRequestException(`AttributeType #${id} is already active`)
    return this.prisma.attribute_types.update({
      where: { id },
      data: { is_active: true }
    })
  }
}
