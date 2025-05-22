import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode
} from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildCreateDto, BuildUpdateDto } from './dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { LoggerService } from '@logger/index';

@ApiTags('Build')
@Controller('build')
export class BuildController {
  private readonly routePrefix: string;
  constructor(
    private readonly buildService: BuildService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(BuildController.name);
    this.routePrefix = 'api/build';
  }

  @Get('get')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all build files' })
  @ApiResponse({
    status: 200,
    description: 'Returns all build files.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to fetch the build files.'
  })
  @ApiOperation({ summary: 'Get all builduration files' })
  getAll() {
    this.logger.log(`Execute handle: ${this.routePrefix}/get`);
    return this.buildService.getAll();
  }

  @Get('get/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get builduration file by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Id of build file' })
  @ApiResponse({
    status: 200,
    description: 'Returns the build file by ID.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to fetch the build file.'
  })
  getById(@Param('id') id: string) {
    this.logger.log(`Execute handle: ${this.routePrefix}/get/${id}`);
    return this.buildService.getById(id);
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new builduration file' })
  @ApiBody({ type: BuildCreateDto })
  @ApiResponse({
    status: 200,
    description: 'The build file has been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to create the build file.'
  })
  create(@Body() dto: BuildCreateDto) {
    this.logger.log(`Execute handle: ${this.routePrefix}/create`);
    return this.buildService.create(dto);
  }

  @Put('update')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update builduration file by ID' })
  @ApiBody({ type: BuildUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'The build file has been successfully updated.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to update the build file.'
  })
  update(@Body() dto: BuildUpdateDto) {
    this.logger.log(`Execute handle: ${this.routePrefix}/update`);
    return this.buildService.update(dto);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id of builduration file'
  })
  @ApiOperation({ summary: 'Delete builduration file by ID' })
  @ApiResponse({
    status: 200,
    description: 'The builduration file has been successfully deleted.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal server error. Failed to delete the builduration file.'
  })
  delete(@Param('id') id: string) {
    this.logger.log(`Execute handle: ${this.routePrefix}/delete/${id}`);
    return this.buildService.delete(id);
  }
}
