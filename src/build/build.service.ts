import { PrismaService } from '@/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BuildCreateDto, BuildUpdateDto } from './dto';
import { BuildHelper } from './helpers';

@Injectable()
export class BuildService {
  constructor(private prismaService: PrismaService) {}

  async getById(id: string) {
    return this.prismaService.builds.findUnique({
      where: {
        id
      }
    });
  }

  async create(dto: BuildCreateDto) {
    const { props, ...data } = dto;

    const { compiledJSX: jsx, compiledSCSS: scss } =
      BuildHelper.compileUniqueClasses(data);

    return this.prismaService.builds.create({
      data: {
        jsx,
        scss,
        props: JSON.stringify(props) as Prisma.InputJsonValue
      }
    });
  }

  async update(dto: BuildUpdateDto) {
    const { id, props, jsx, scss } = dto;

    const updatedBuild = await this.getById(id);

    if (!updatedBuild) {
      throw new BadRequestException('Invalid id value');
    }

    updatedBuild.jsx = jsx || updatedBuild.jsx;
    updatedBuild.scss = scss || updatedBuild.scss;
    updatedBuild.props = props ? JSON.stringify(props) : updatedBuild.props;

    return this.prismaService.builds.update({
      where: {
        id
      },
      data: updatedBuild
    });
  }

  async delete(id: string) {
    return this.prismaService.builds.delete({
      where: {
        id
      }
    });
  }
}
