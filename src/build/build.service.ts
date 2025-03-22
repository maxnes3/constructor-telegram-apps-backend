import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BuildCreateDto, BuildUpdateDto } from './dto';
import { BuildUtils } from './utils';

@Injectable()
export class BuildService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: BuildCreateDto) {
    const { props, ...data } = dto;

    const compiledData = BuildUtils.compileClassesToSCSS(data);

    return this.prismaService.builds.create({
      data: {
        ...compiledData,
        props: props as Prisma.InputJsonValue
      }
    });
  }

  async update(id: string, dto: BuildUpdateDto) {
    const { props, ...data } = dto;

    const compiledData = BuildUtils.compileClassesToSCSS(data);

    return this.prismaService.builds.update({
      where: {
        id
      },
      data: {
        ...compiledData,
        props: props as Prisma.InputJsonValue
      }
    });
  }
}
