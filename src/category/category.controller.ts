import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CategoryCreateRequestDto } from './dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('get')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all categories.'
  })
  async getAll() {
    return this.categoryService.getAll();
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CategoryCreateRequestDto })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully created.',
    type: CategoryCreateRequestDto
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  async create(@Body() dto: CategoryCreateRequestDto) {
    return this.categoryService.create(dto);
  }
}
