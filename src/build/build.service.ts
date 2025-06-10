import { BadRequestException, Injectable } from '@nestjs/common';
import { BuildCreateDto } from './dto/build.create';
import { BuildUpdateDto } from './dto/build.update';
import { PrismaService } from '@/prisma.service';
import { LoggerService } from '@/logger';

@Injectable()
export class BuildService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(BuildService.name);
  }

  async getAll() {
    this.logger.debug('Pull all build files from database');
    return this.prismaService.builds.findMany();
  }

  async getById(id: string) {
    try {
      this.logger.debug(`Pull build files from database by id: ${id}`);
      const build = await this.prismaService.builds.findUnique({
        where: { id }
      });
      return build;
    } catch (error) {
      this.logger.error(`Invalid id value: ${error}`);
      throw new BadRequestException('Invalid id value', error);
    }
  }

  async getForOS(currentOS?: string) {
    this.logger.debug(`Pull build files by os: ${currentOS}`);
    if (currentOS) {
      return this.prismaService.builds.findMany({
        where: { os: currentOS }
      });
    } else {
      return this.prismaService.builds.findMany({
        where: { os: 'all' }
      });
    }
  }

  async create(data: BuildCreateDto) {
    try {
      this.logger.debug(`Insert build file into database`);
      const newBuild = await this.prismaService.builds.create({
        data
      });
      return newBuild;
    } catch (error) {
      this.logger.error(`Invalid data: ${error}`);
      throw new BadRequestException('Invalid data', error);
    }
  }

  async update(dto: BuildUpdateDto) {
    const { id, name, isSource, code } = dto;

    this.logger.debug(`Pull build file from database by id: ${id}`);
    const updatedBuild = await this.getById(id);

    if (!updatedBuild) {
      this.logger.error('Invalid id value');
      throw new BadRequestException('Invalid id value');
    }

    this.logger.debug('Check build file changes');
    updatedBuild.name = name || updatedBuild.name;
    updatedBuild.code = code || updatedBuild.code;
    updatedBuild.isSource = isSource || updatedBuild.isSource;

    this.logger.debug(`Update build file data at database by id: ${id}`);
    return this.prismaService.builds.update({
      where: {
        id
      },
      data: updatedBuild
    });
  }

  async delete(id: string) {
    this.logger.debug(`Delete build file from database by id: ${id}`);
    return this.prismaService.builds.delete({
      where: {
        id
      }
    });
  }
}
