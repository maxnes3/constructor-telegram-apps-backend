import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '@/prisma.service';
import { LoggerModule } from '@logger/index';

@Module({
  imports: [LoggerModule],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
  exports: [CategoryService]
})
export class CategoryModule {}
