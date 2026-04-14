import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductVariantsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.product_variants.findMany({
      include: {
        variant_attributes: {
          include: {
            attribute_values: {
              include: {
                attribute_types: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.product_variants.findUnique({
      where: { id },
      include: {
        variant_attributes: {
          include: {
            attribute_values: {
              include: {
                attribute_types: true,
              },
            },
          },
        },
      },
    });
    if (!record) throw new NotFoundException(`ProductVariant #${id} not found`);
    return record;
  }
}
