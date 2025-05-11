import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigCreateDto } from './dto/config.create';
import { ConfigUpdateDto } from './dto/config.update';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class ConfigService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.configs.findMany();
  }

  async getById(id: string) {
    try {
      const config = await this.prismaService.configs.findUnique({
        where: { id }
      });
      return config;
    } catch (error) {
      throw new BadRequestException('Invalid id value', error);
    }
  }

  async getForOS(currentOS: string) {
    return this.prismaService.configs.findMany({
      where: {
        OR: [{ os: currentOS }, { os: 'all' }]
      }
    });
  }

  async create(data: ConfigCreateDto) {
    const newConfig = await this.prismaService.configs.create({
      data
    });
    return newConfig;
  }

  async update(dto: ConfigUpdateDto) {
    const { id, name, isSource, code } = dto;

    const updatedConfig = await this.getById(id);

    if (!updatedConfig) {
      throw new BadRequestException('Invalid id value');
    }

    updatedConfig.name = name || updatedConfig.name;
    updatedConfig.code = code || updatedConfig.code;
    updatedConfig.isSource = isSource || updatedConfig.isSource;

    return this.prismaService.configs.update({
      where: {
        id
      },
      data: updatedConfig
    });
  }

  async delete(id: string) {
    return this.prismaService.configs.delete({
      where: {
        id
      }
    });
  }
}
