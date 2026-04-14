import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttributeTypesService } from './attribute-types.service';

@ApiTags('attribute-types')
@Controller('attribute-types')
export class AttributeTypesController {
  constructor(private readonly service: AttributeTypesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}
