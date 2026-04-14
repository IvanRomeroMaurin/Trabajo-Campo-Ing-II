import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Query, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { Category as CategoryEntity } from '../../domain/entities/category.entity'
import { CreateCategoryDto } from '../dtos/create-category.dto'
import { UpdateCategoryDto } from '../dtos/update-category.dto'
import { SupabaseAuthGuard } from '../../../auth/supabase-auth.guard'
import { RolesGuard } from '../../../auth/guards/roles.guard'
import { Roles } from '../../../auth/decorators/roles.decorator'

// Use Cases
import { GetAllCategoriesUseCase } from '../../application/use-cases/get-all-categories.use-case'
import { GetOneCategoryUseCase } from '../../application/use-cases/get-one-category.use-case'
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case'
import { UpdateCategoryUseCase } from '../../application/use-cases/update-category.use-case'
import { RemoveCategoryUseCase } from '../../application/use-cases/remove-category.use-case'
import { RestoreCategoryUseCase } from '../../application/use-cases/restore-category.use-case'

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly getAllUseCase: GetAllCategoriesUseCase,
    private readonly getOneUseCase: GetOneCategoryUseCase,
    private readonly createUseCase: CreateCategoryUseCase,
    private readonly updateUseCase: UpdateCategoryUseCase,
    private readonly removeUseCase: RemoveCategoryUseCase,
    private readonly restoreUseCase: RestoreCategoryUseCase
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: CategoryEntity, isArray: true })
  findAll() {
    return this.getAllUseCase.execute()
  }

  @Get(':slug')
  @ApiResponse({ status: 200, type: CategoryEntity })
  findBySlug(@Param('slug') slug: string) {
    return this.getOneUseCase.execute(slug)
  }

  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CategoryEntity })
  create(@Body() dto: CreateCategoryDto) {
    return this.createUseCase.execute(dto)
  }

  @Patch(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CategoryEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
    return this.updateUseCase.execute(id, dto)
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.removeUseCase.execute(id)
  }

  @Get('admin/all')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  findAllAdmin(@Query('includeInactive') includeInactive?: string) {
    return this.getAllUseCase.execute(includeInactive === 'true')
  }

  @Patch(':id/restore')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.restoreUseCase.execute(id)
  }
}
