import { Body, Controller, HttpCode, Param, Post, Put } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildCreateDto, BuildUpdateDto } from './dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Build')
@Controller('build')
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

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
}
