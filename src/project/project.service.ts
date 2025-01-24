import { TemplateService } from '@/template/template.service';
import { Injectable } from '@nestjs/common';
import { ProjectRequestDto } from './dto/project.request';

@Injectable()
export class ProjectService {
  constructor(private templateService: TemplateService) {}

  async createProjectZip(data: ProjectRequestDto) {
    console.log(data);
  }
}
