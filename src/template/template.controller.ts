import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateCreateRequestDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam
} from '@nestjs/swagger';

@ApiTags('Template')
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get('get')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all templates' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all templates.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to fetch templates.'
  })
  async getAll() {
    return this.templateService.getAll();
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new template' })
  @ApiBody({ type: TemplateCreateRequestDto })
  @ApiResponse({
    status: 200,
    description: 'The template has been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to create the template.'
  })
  async create(@Body() dto: TemplateCreateRequestDto) {
    return this.templateService.create(dto);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete template by id' })
  @ApiParam({ name: 'id', type: String, description: 'Id of deleted template' })
  @ApiResponse({
    status: 200,
    description: 'The template has been successfully deleted.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to delete the template.'
  })
  async delete(@Param('id') id: string) {
    return this.templateService.deleteById(id);
  }
}
