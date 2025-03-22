import { Module } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';
import { PrismaService } from '@/prisma.service';

@Module({
  controllers: [BuildController],
  providers: [BuildService, PrismaService],
  exports: [BuildService]
})
export class BuildModule {}
