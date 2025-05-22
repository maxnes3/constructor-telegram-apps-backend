import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from '@/prisma.service';
import { TemplateModule } from '@template/template.module';
import { BuildModule } from '@/build/build.module';
import { ScreenModule } from '@/screen/screen.module';
import { LoggerModule } from '@/logger/index';

@Module({
  imports: [ScreenModule, TemplateModule, BuildModule, LoggerModule],
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService]
})
export class ProjectModule {}
