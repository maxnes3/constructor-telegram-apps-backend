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
import { ScreenService } from './screen.service';
import { ScreenCreateDto, ScreenUpdateDto } from './dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('Screen')
@Controller('screen')
export class ScreenController {
  constructor(private readonly screenService: ScreenService) {}

  @Get('get')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all screens' })
  @ApiResponse({
    status: 200,
    description: 'Returns all screens.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to fetch the screen.'
  })
  getAll() {
    return this.screenService.getAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get screen by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Id of screen' })
  @ApiResponse({
    status: 200,
    description: 'Returns the screen.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to fetch the screen.'
  })
  getById(@Param('id') id: string) {
    return this.screenService.getById(id);
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new screen' })
  @ApiBody({ type: ScreenCreateDto })
  @ApiResponse({
    status: 200,
    description: 'The screen has been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to create the screen.'
  })
  create(@Body() dto: ScreenCreateDto) {
    return this.screenService.create(dto);
  }

  @Put('update')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update screen data by ID' })
  @ApiBody({ type: ScreenUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'The screen has been successfully updated.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to update the screen.'
  })
  update(@Body() dto: ScreenUpdateDto) {
    return this.screenService.update(dto);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete screen data by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Id of screen' })
  @ApiResponse({
    status: 200,
    description: 'The screen has been successfully deleted.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to delete the screen.'
  })
  delete(@Param('id') id: string) {
    return this.screenService.delete(id);
  }
}
