import { Module } from '@nestjs/common';
import { PrototypeService } from './prototype.service';
import { PrototypeController } from './prototype.controller';
import { PrismaService } from '@/prisma.service';

@Module({
  controllers: [PrototypeController],
  providers: [PrototypeService, PrismaService]
})
export class PrototypeModule {}
