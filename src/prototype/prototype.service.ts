import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { PrototypeCreateRequestDto } from './dto';

@Injectable()
export class PrototypeService {
  constructor(private prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.prototypes.findMany();
  }

  async create(data: PrototypeCreateRequestDto) {
    const newPrototype = await this.prismaService.prototypes.create({
      data
    });

    return newPrototype;
  }
}
