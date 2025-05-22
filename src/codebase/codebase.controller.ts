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
import { CodebaseService } from './codebase.service';
import { CodebaseCreateDto, CodebaseUpdateDto } from './dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { LoggerService } from '@logger/index';

@ApiTags('Codebase')
@Controller('codebase')
export class CodebaseController {
  private readonly routePrefix: string;
  constructor(
    private readonly codebaseService: CodebaseService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(CodebaseController.name);
    this.routePrefix = 'api/codebase';
  }

  @Get('get')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all codebases data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the codebases data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to fetch the codebases.'
  })
  async getAll() {
    this.logger.log(`Execute handle: ${this.routePrefix}/get`);
    return this.codebaseService.getAll();
  }

  @Get('get/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get codebase data by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Id of codebase' })
  @ApiResponse({
    status: 200,
    description: 'Returns the codebase data.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to fetch the codebase.'
  })
  async getById(@Param('id') id: string) {
    this.logger.log(`Execute handle: ${this.routePrefix}/get/${id}`);
    return this.codebaseService.getById(id);
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new codebase data' })
  @ApiBody({ type: CodebaseCreateDto })
  @ApiResponse({
    status: 200,
    description: 'The codebase has been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to create the codebase.'
  })
  async create(@Body() dto: CodebaseCreateDto) {
    this.logger.log(`Execute handle: ${this.routePrefix}/create`);
    return this.codebaseService.create(dto);
  }

  @Put('update')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update codebase data by ID' })
  @ApiBody({ type: CodebaseUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'The codebase has been successfully updated.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to update the codebase.'
  })
  async update(@Body() dto: CodebaseUpdateDto) {
    this.logger.log(`Execute handle: ${this.routePrefix}/update`);
    return this.codebaseService.update(dto);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete codebase data by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Id of codebase' })
  @ApiResponse({
    status: 200,
    description: 'The codebase has been successfully deleted.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to delete the codebase.'
  })
  async delete(@Param('id') id: string) {
    this.logger.log(`Execute handle: ${this.routePrefix}/delete/${id}`);
    return this.codebaseService.delete(id);
  }
}
