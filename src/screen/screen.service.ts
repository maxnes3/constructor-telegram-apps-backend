import { BadRequestException, Injectable } from '@nestjs/common';
import { ScreenCreateDto, ScreenUpdateDto } from './dto';
import { PrismaService } from '@/prisma.service';
import { TemplateService } from '@/template';

@Injectable()
export class ScreenService {
  constructor(
    private prismaService: PrismaService,
    private templateService: TemplateService
  ) {}

  async getAll() {
    return this.prismaService.screens.findMany({
      include: {
        templates: true
      }
    });
  }

  async getById(id: string) {
    try {
      const screen = await this.prismaService.screens.findUnique({
        where: { id },
        include: {
          templates: true
        }
      });
      return screen;
    } catch (error) {
      throw new BadRequestException('Invalid id value', error);
    }
  }

  async create(data: ScreenCreateDto) {
    const newScreen = await this.prismaService.screens.create({
      data
    });
    return newScreen;
  }

  async update(dto: ScreenUpdateDto) {
    const { id, name, isStartScreen, templatesIds } = dto;

    const updatedScreen = await this.getById(id);

    if (!updatedScreen) {
      throw new BadRequestException('Invalid id value');
    }

    updatedScreen.name = name || updatedScreen.name;
    updatedScreen.isStartScreen = isStartScreen || updatedScreen.isStartScreen;
    const templates =
      templatesIds.map((templateId) => ({ id: templateId })) ||
      updatedScreen.templates.map((template) => ({ id: template.id }));

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
    return this.prismaService.screens.delete({
      where: { id }
    });
  }
}
