import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { PrototypeCreateRequestDto } from './dto';

@Injectable()
export class PrototypeService {
  constructor(private prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.prototypes.findMany();
  }

  async create(dto: PrototypeCreateRequestDto) {
    const newPrototype = await this.prismaService.prototypes.create({
      data: {
        modelName: dto.model_name,
        aspectRatioX: dto.aspect_ratio_x,
        aspectRatioY: dto.aspect_ratio_y,
        borderWidth: dto.border_width,
        borderRadius: dto.border_radius
      }
    });

    return newPrototype;
  }
}
