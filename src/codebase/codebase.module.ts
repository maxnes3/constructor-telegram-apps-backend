import { Module } from '@nestjs/common';
import { CodebaseService } from './codebase.service';
import { CodebaseController } from './codebase.controller';
import { PrismaService } from '@/prisma.service';
import { LoggerModule } from '@/logger';

@Module({
  imports: [LoggerModule],
  controllers: [CodebaseController],
  providers: [CodebaseService, PrismaService],
  exports: [CodebaseService]
})
export class CodebaseModule {}
