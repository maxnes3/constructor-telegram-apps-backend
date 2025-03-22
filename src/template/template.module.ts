import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { PrismaService } from '@/prisma.service';
import { BuildModule } from '@/build';

@Module({
  imports: [BuildModule],
  controllers: [TemplateController],
  providers: [TemplateService, PrismaService],
  exports: [TemplateService]
})
export class TemplateModule {}
