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
import { ConfigService } from './config.service';
import { ConfigCreateDto, ConfigUpdateDto } from './dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { LoggerService } from '@logger/index';

@ApiTags('Config')
@Controller('config')
export class ConfigController {
  private readonly routePrefix: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(ConfigController.name);
    this.routePrefix = 'api/config';
  }

  @Get('get')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all config files' })
  @ApiResponse({
    status: 200,
    description: 'Returns all config files.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to fetch the config files.'
  })
  @ApiOperation({ summary: 'Get all configuration files' })
  getAll() {
    this.logger.log(`Execute handle: ${this.routePrefix}/get`);
    return this.configService.getAll();
  }

  @Get('get/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get configuration file by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Id of config file' })
  @ApiResponse({
    status: 200,
    description: 'Returns the config file by ID.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to fetch the config file.'
  })
  getById(@Param('id') id: string) {
    this.logger.log(`Execute handle: ${this.routePrefix}/get/${id}`);
    return this.configService.getById(id);
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new configuration file' })
  @ApiBody({ type: ConfigCreateDto })
  @ApiResponse({
    status: 200,
    description: 'The config file has been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to create the config file.'
  })
  create(@Body() dto: ConfigCreateDto) {
    this.logger.log(`Execute handle: ${this.routePrefix}/create`);
    return this.configService.create(dto);
  }

  @Put('update')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update configuration file by ID' })
  @ApiBody({ type: ConfigUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'The config file has been successfully updated.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to update the config file.'
  })
  update(@Body() dto: ConfigUpdateDto) {
    this.logger.log(`Execute handle: ${this.routePrefix}/update`);
    return this.configService.update(dto);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id of configuration file'
  })
  @ApiOperation({ summary: 'Delete configuration file by ID' })
  @ApiResponse({
    status: 200,
    description: 'The configuration file has been successfully deleted.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal server error. Failed to delete the configuration file.'
  })
  delete(@Param('id') id: string) {
    this.logger.log(`Execute handle: ${this.routePrefix}/delete/${id}`);
    return this.configService.delete(id);
  }
}
