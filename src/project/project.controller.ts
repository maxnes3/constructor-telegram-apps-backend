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
import { LoggerService } from '@logger/index';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  private readonly routePrefix: string;
  constructor(
    private readonly projectService: ProjectService,
    private logger: LoggerService
  ) {
    this.logger.setContext(ProjectController.name);
    this.routePrefix = 'api/project';
  }

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
    this.logger.log(
      `Execute handle: ${this.routePrefix}/getprojectconfig/${os}`
    );
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
    this.logger.log(`Execute handle: ${this.routePrefix}/download`);
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
    this.logger.log(`Execute handle: ${this.routePrefix}/save`);
    return this.projectService.saveProject(dto);
  }
}
