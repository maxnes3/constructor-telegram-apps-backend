import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { PrismaService } from '@/prisma.service';
import { LoggerModule } from '@logger/index';

@Module({
  imports: [LoggerModule],
  controllers: [ConfigController],
  providers: [ConfigService, PrismaService],
  exports: [ConfigService]
})
export class ConfigModule {}
