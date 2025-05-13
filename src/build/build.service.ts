import { PrismaService } from '@/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BuildCreateDto, BuildUpdateDto } from './dto';
import { BuildHelper } from './helpers';
import { LoggerService } from '@logger/index';

@Injectable()
export class BuildService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(BuildService.name);
  }

  async getById(id: string) {
    this.logger.debug(`Pull build from database by id: ${id}`);
    return this.prismaService.builds.findUnique({
      where: {
        id
      }
    });
  }

  async create(dto: BuildCreateDto) {
    const { props, ...data } = dto;

    this.logger.debug(`Compiling unique classes by data`);
    const { compiledJSX: jsx, compiledSCSS: scss } =
      BuildHelper.compileUniqueClasses(data);

    this.logger.debug(`Insert build into database`);
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

    this.logger.debug(`Pull build from database by id: ${id}`);
    const updatedBuild = await this.getById(id);

    if (!updatedBuild) {
      this.logger.error('Invalid id value');
      throw new BadRequestException('Invalid id value');
    }

    this.logger.debug('Check build changes');
    updatedBuild.jsx = jsx || updatedBuild.jsx;
    updatedBuild.scss = scss || updatedBuild.scss;
    updatedBuild.props = props ? JSON.stringify(props) : updatedBuild.props;

    this.logger.debug(`Update build data at database by id: ${id}`);
    return this.prismaService.builds.update({
      where: {
        id
      },
      data: updatedBuild
    });
  }

  async delete(id: string) {
    this.logger.debug(`Delete build from database by id: ${id}`);
    return this.prismaService.builds.delete({
      where: {
        id
      }
    });
  }
}
