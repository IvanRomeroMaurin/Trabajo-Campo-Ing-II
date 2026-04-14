import { Module } from '@nestjs/common';
import { AttributeTypesService } from './attribute-types.service';
import { AttributeTypesController } from './attribute-types.controller';

@Module({
  controllers: [AttributeTypesController],
  providers: [AttributeTypesService],
  exports: [AttributeTypesService],
})
export class AttributeTypesModule {}
