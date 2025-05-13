import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigCreateDto } from './dto/config.create';
import { ConfigUpdateDto } from './dto/config.update';
import { PrismaService } from '@/prisma.service';
import { LoggerService } from '@/logger';

@Injectable()
export class ConfigService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(ConfigService.name);
  }

  async getAll() {
    this.logger.debug('Pull all config files from database');
    return this.prismaService.configs.findMany();
  }

  async getById(id: string) {
    try {
      this.logger.debug(`Pull config files from database by id: ${id}`);
      const config = await this.prismaService.configs.findUnique({
        where: { id }
      });
      return config;
    } catch (error) {
      this.logger.error(`Invalid id value: ${error}`);
      throw new BadRequestException('Invalid id value', error);
    }
  }

  async getForOS(currentOS: string) {
    this.logger.debug(`Pull config files by os: ${currentOS}`);
    return this.prismaService.configs.findMany({
      where: {
        OR: [{ os: currentOS }, { os: 'all' }]
      }
    });
  }

  async create(data: ConfigCreateDto) {
    try {
      this.logger.debug(`Insert config file into database`);
      const newConfig = await this.prismaService.configs.create({
        data
      });
      return newConfig;
    } catch (error) {
      this.logger.error(`Invalid data: ${error}`);
      throw new BadRequestException('Invalid data', error);
    }
  }

  async update(dto: ConfigUpdateDto) {
    const { id, name, isSource, code } = dto;

    this.logger.debug(`Pull config file from database by id: ${id}`);
    const updatedConfig = await this.getById(id);

    if (!updatedConfig) {
      this.logger.error('Invalid id value');
      throw new BadRequestException('Invalid id value');
    }

    this.logger.debug('Check config file changes');
    updatedConfig.name = name || updatedConfig.name;
    updatedConfig.code = code || updatedConfig.code;
    updatedConfig.isSource = isSource || updatedConfig.isSource;

    this.logger.debug(`Update config file data at database by id: ${id}`);
    return this.prismaService.configs.update({
      where: {
        id
      },
      data: updatedConfig
    });
  }

  async delete(id: string) {
    this.logger.debug(`Delete config file from database by id: ${id}`);
    return this.prismaService.configs.delete({
      where: {
        id
      }
    });
  }
}
