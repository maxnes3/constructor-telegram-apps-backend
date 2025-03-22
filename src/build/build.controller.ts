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
import { BuildService } from './build.service';
import { BuildCreateDto, BuildUpdateDto } from './dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Build')
@Controller('build')
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Get('get/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get build data by ID' })
  @ApiBody({ type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns the build data.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to fetch the build.'
  })
  async getById(@Param('id') id: string) {
    return this.buildService.getById(id);
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create build data' })
  @ApiBody({ type: BuildCreateDto })
  @ApiResponse({
    status: 200,
    description: 'The build has been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to create the build.'
  })
  async create(@Body() dto: BuildCreateDto) {
    return this.buildService.create(dto);
  }

  @Put('update/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update build data' })
  @ApiBody({ type: BuildUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'The build has been successfully updated.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to update the build.'
  })
  async update(@Param('id') id: string, @Body() dto: BuildUpdateDto) {
    return this.buildService.update(id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete build data' })
  @ApiBody({ type: String })
  @ApiResponse({
    status: 200,
    description: 'The build has been successfully deleted.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to delete the build.'
  })
  async delete(id: string) {
    return this.buildService.delete(id);
  }
}
