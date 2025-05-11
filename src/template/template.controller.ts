import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateCreateDto, TemplateUpdateDto } from './dto';
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

  @Get('get/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get template by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Id of template' })
  @ApiResponse({
    status: 200,
    description: 'Returns the template data.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to fetch the template.'
  })
  async getById(@Param('id') id: string) {
    return this.templateService.getById(id);
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new template' })
  @ApiBody({ type: TemplateCreateDto })
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
  async create(@Body() dto: TemplateCreateDto) {
    return this.templateService.create(dto);
  }

  @Put('update')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update template by ID' })
  @ApiBody({ type: TemplateUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'The template has been successfully updated.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to update the template.'
  })
  async update(@Body() dto: TemplateUpdateDto) {
    return this.templateService.update(dto);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete template by ID' })
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
    return this.templateService.delete(id);
  }
}
