import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { PrismaService } from '@/prisma.service';
import { BuildModule } from '@/build';
import { LoggerModule } from '@/logger';

@Module({
  imports: [BuildModule, LoggerModule],
  controllers: [TemplateController],
  providers: [TemplateService, PrismaService],
  exports: [TemplateService]
})
export class TemplateModule {}
