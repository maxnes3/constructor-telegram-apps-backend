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

@ApiTags('Config')
@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('get')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all configuration files' })
  getAll() {
    return this.configService.getAll();
  }

  @Get('get/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get configuration file by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Id of config file' })
  getById(@Param('id') id: string) {
    return this.configService.getById(id);
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new configuration file' })
  @ApiBody({ type: ConfigCreateDto })
  create(@Body() dto: ConfigCreateDto) {
    return this.configService.create(dto);
  }

  @Put('update')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update configuration file by ID' })
  @ApiBody({ type: ConfigUpdateDto })
  update(@Body() dto: ConfigUpdateDto) {
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
    return this.configService.delete(id);
  }
}
