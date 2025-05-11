import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from '@/prisma.service';
import { TemplateModule } from '@template/template.module';
import { ConfigModule } from '@/config/config.module';
import { ScreenModule } from '@/screen/screen.module';

@Module({
  imports: [ScreenModule, TemplateModule, ConfigModule],
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService]
})
export class ProjectModule {}
