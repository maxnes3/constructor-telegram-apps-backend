import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Delete,
  Put,
  Param
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam
} from '@nestjs/swagger';
import { CategoryCreateDto, CategoryUpdateDto } from './dto';

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

  @Get('get/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Id of category' })
  @ApiResponse({
    status: 200,
    description: 'Returns the category data.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  async getById(@Param('id') id: string) {
    return this.categoryService.getById(id);
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CategoryCreateDto })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully created.',
    type: CategoryCreateDto
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  async create(@Body() dto: CategoryCreateDto) {
    return this.categoryService.create(dto);
  }

  @Put('update')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update category by ID' })
  @ApiBody({ type: CategoryUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to update the category.'
  })
  async update(@Body() dto: CategoryUpdateDto) {
    return this.categoryService.update(dto);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete category by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Id of category' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to delete the category.'
  })
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
