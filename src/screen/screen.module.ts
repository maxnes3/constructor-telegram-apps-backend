import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { PrismaService } from '@/prisma.service';
import { TemplateModule } from '@/template';

@Module({
  imports: [TemplateModule],
  controllers: [ScreenController],
  providers: [ScreenService, PrismaService],
  exports: [ScreenService]
})
export class ScreenModule {}
