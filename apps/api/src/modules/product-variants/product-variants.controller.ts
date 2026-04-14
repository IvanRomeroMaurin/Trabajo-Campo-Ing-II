import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductVariantsService } from './product-variants.service';

@ApiTags('product-variants')
@Controller('product-variants')
export class ProductVariantsController {
  constructor(private readonly service: ProductVariantsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}
