import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectRequestDto } from './dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('download')
  @HttpCode(200)
  async createProjectZip(@Body() dto: ProjectRequestDto) {
    await this.projectService.createProjectZip(dto);
  }
}
