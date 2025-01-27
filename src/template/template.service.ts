import { PrismaService } from '@/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TemplateCreateRequestDto } from './dto';

@Injectable()
export class TemplateService {
  constructor(private prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.templates.findMany({
      include: { demo: true, prototype: true }
    });
  }

  async getById(id: string) {
    try {
      const template = await this.prismaService.templates.findUnique({
        where: { id }
      });
      return template;
    } catch (error) {
      throw new BadRequestException('Invalid id value', error);
    }
  }

  async create(dto: TemplateCreateRequestDto) {
    const { demo, prototype, categoryId, ...rest } = dto;

    const newTemplate = await this.prismaService.templates.create({
      data: {
        ...rest,
        category: {
          connect: { id: categoryId }
        },
        demo: {
          create: demo
        },
        prototype: {
          create: prototype
        }
      },
      include: {
        demo: true,
        prototype: true
      }
    });

    return newTemplate;
  }

  async getTemplatesByIds(ids: string[]) {
    return this.prismaService.templates.findMany({
      where: {
        id: { in: ids }
      },
      include: {
        prototype: true
      }
    });
  }
}
