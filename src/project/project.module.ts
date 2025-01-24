import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from '@/prisma.service';
import { TemplateModule } from '@/template/template.module';

@Module({
  imports: [TemplateModule],
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService]
})
export class ProjectModule {}
