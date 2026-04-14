import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Patch, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
import { ApiResponse } from '@nestjs/swagger'
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { Review } from './entities/review.entity'

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  // PÚBLICO — reseñas de un producto
  @Get('product/:productId')
  @ApiQuery({ name: 'productId', required: true, description: 'ID del producto' })
  @ApiResponse({ status: 200, type: Review, isArray: true })
  findByProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.service.findByProduct(productId)
  }

  // PROTEGIDO — crear reseña
  @Post()
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: Review })
  create(
    @Body() dto: CreateReviewDto,
    @CurrentUser() user: any
  ) {
    return this.service.create(dto, user.sub)
  }

  // PROTEGIDO — eliminar reseña propia
  @Delete(':id')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any
  ) {
    // Note: If admin, we should pass isAdmin flag. 
    // For now, I'll check if user has admin role if I have it in CurrentUser.
    const isAdmin = user.roles?.includes('admin')
    return this.service.remove(id, user.sub, isAdmin)
  }

  @Get('admin/all')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  findAllAdmin(@Query('includeInactive') includeInactive?: string) {
    return this.service.findAllAdmin(includeInactive === 'true')
  }

  @Patch(':id/restore')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id)
  }
}
