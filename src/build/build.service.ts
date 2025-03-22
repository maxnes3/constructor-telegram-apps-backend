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

    const { compiledJSX: jsx, compiledSCSS: scss } =
      BuildUtils.compileUniqueClasses(data);

    return this.prismaService.builds.create({
      data: {
        jsx,
        scss,
        props: JSON.stringify(props) as Prisma.InputJsonValue
      }
    });
  }

  async update(id: string, dto: BuildUpdateDto) {
    const { props, ...data } = dto;

    const { compiledJSX: jsx, compiledSCSS: scss } =
      BuildUtils.compileUniqueClasses(data);

    return this.prismaService.builds.update({
      where: {
        id
      },
      data: {
        jsx,
        scss,
        props: JSON.stringify(props) as Prisma.InputJsonValue
      }
    });
  }
}
