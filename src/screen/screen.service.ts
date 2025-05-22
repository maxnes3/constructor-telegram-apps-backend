import { BadRequestException, Injectable } from '@nestjs/common';
import { ScreenCreateDto, ScreenUpdateDto } from './dto';
import { PrismaService } from '@/prisma.service';
import { TemplateService } from '@/template';
import { LoggerService } from '@/logger';

@Injectable()
export class ScreenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly templateService: TemplateService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(ScreenService.name);
  }

  async getAll() {
    this.logger.debug('Pull all screens with templates from database');
    return this.prismaService.screens.findMany({
      include: {
        templates: true
      }
    });
  }

  async getById(id: string) {
    try {
      this.logger.debug(
        `Pull screen with templates from database by id: ${id}`
      );
      const screen = await this.prismaService.screens.findUnique({
        where: { id },
        include: {
          templates: true
        }
      });
      return screen;
    } catch (error) {
      this.logger.error(`Invalid id value: ${error}`);
      throw new BadRequestException('Invalid id value', error);
    }
  }

  async create(data: ScreenCreateDto) {
    try {
      this.logger.debug(`Insert screen into database`);
      if (!data.projectId) {
        throw new BadRequestException('Invalid data', 'projectId');
      }
      const newScreen = await this.prismaService.screens.create({
        data: {
          name: data.name,
          isStartScreen: data.isStartScreen,
          project: { connect: { id: data.projectId } }
        }
      });
      return newScreen;
    } catch (error) {
      this.logger.error(`Invalid data: ${error}`);
      throw new BadRequestException('Invalid data', error);
    }
  }

  async update(dto: ScreenUpdateDto) {
    const { id, name, isStartScreen, templatesIds } = dto;

    this.logger.debug(`Pull screen from database by id: ${id}`);
    const updatedScreen = await this.getById(id);

    if (!updatedScreen) {
      this.logger.error('Invalid id value');
      throw new BadRequestException('Invalid id value');
    }

    this.logger.debug('Check screen changes');
    updatedScreen.name = name || updatedScreen.name;
    updatedScreen.isStartScreen = isStartScreen || updatedScreen.isStartScreen;
    const templates =
      templatesIds.map((templateId) => ({ id: templateId })) ||
      updatedScreen.templates.map((template) => ({ id: template.id }));

    this.logger.debug(`Update screen data at database by id: ${id}`);
    return this.prismaService.screens.update({
      where: {
        id
      },
      data: {
        name: updatedScreen.name,
        isStartScreen: updatedScreen.isStartScreen,
        templates: { set: templates }
      }
    });
  }

  delete(id: string) {
    this.logger.debug(`Delete screen from database by id: ${id}`);
    return this.prismaService.screens.delete({
      where: { id }
    });
  }
}
