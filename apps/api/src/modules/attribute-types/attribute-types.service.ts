import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AttributeTypesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.attribute_types.findMany({
      include: {
        attribute_values: true,
      },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.attribute_types.findUnique({
      where: { id },
      include: {
        attribute_values: true,
      },
    });
    if (!record) throw new NotFoundException(`AttributeType #${id} not found`);
    return record;
  }
}
