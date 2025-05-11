import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Res
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectRequestDto } from './dto';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('getprojectconfig/:os')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get Project with all based config files' })
  @ApiResponse({
    status: 200,
    description: 'The project zip file has been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to create the project zip file.'
  })
  async getProjectConfig(@Param('os') os: string, @Res() res: Response) {
    await this.projectService.getProjectConfig(os, res);
  }

  @Post('download')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create zip file of project' })
  @ApiBody({ type: ProjectRequestDto })
  @ApiResponse({
    status: 200,
    description: 'The project zip file has been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to create the project zip file.'
  })
  async createProjectZip(@Body() dto: ProjectRequestDto, @Res() res: Response) {
    await this.projectService.downloadProjectZip(dto, res);
  }

  @Post('save')
  @HttpCode(200)
  @ApiOperation({ summary: 'Save project at server' })
  @ApiBody({ type: ProjectRequestDto })
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully saved.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to save the project.'
  })
  async saveProject(@Body() dto: ProjectRequestDto) {
    return this.projectService.saveProject(dto);
  }
}
