import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { PrototypeService } from './prototype.service';
import { PrototypeCreateRequestDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Prototype')
@Controller('prototype')
export class PrototypeController {
  constructor(private readonly prototypeService: PrototypeService) {}

  @Get('get')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all prototypes' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all prototypes.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to fetch prototypes.'
  })
  async getAll() {
    return this.prototypeService.getAll();
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new prototype' })
  @ApiBody({ type: PrototypeCreateRequestDto })
  @ApiResponse({
    status: 200,
    description: 'The prototype has been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to create the prototype.'
  })
  async create(@Body() dto: PrototypeCreateRequestDto) {
    return this.prototypeService.create(dto);
  }
}
