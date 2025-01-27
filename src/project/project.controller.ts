import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectRequestDto } from './dto';
import { Response } from 'express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('download')
  @HttpCode(200)
  async createProjectZip(@Body() dto: ProjectRequestDto, @Res() res: Response) {
    await this.projectService.createProjectZip(dto, res);
  }
}
