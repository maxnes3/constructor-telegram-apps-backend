import { PrismaService } from '@/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TemplateCreateDto, TemplateUpdateDto } from './dto';
import { BuildService } from '@/build';

@Injectable()
export class TemplateService {
  constructor(
    private prismaService: PrismaService,
    private buildService: BuildService
  ) {}

  async getAll() {
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

  async getTemplatesByIds(ids: string[]) {
    return this.prismaService.templates.findMany({
      where: {
        id: { in: ids }
      },
      include: {
        prototype: true,
        demo: true
      }
    });
  }

  async create(dto: TemplateCreateDto) {
    const { demo, prototype, categoryId, ...rest } = dto;

    const createdDemo = await this.buildService.create(demo);
    const createdPrototype = await this.buildService.create(prototype);

    if (!createdDemo || !createdPrototype) {
      throw new BadRequestException('Invalid data in demo or prototype');
    }

    const newTemplate = await this.prismaService.templates.create({
      data: {
        ...rest,
        category: {
          connect: { id: categoryId }
        },
        demo: {
          connect: { id: createdDemo.id }
        },
        prototype: {
          connect: { id: createdPrototype.id }
        }
      },
      include: {
        demo: true,
        prototype: true
      }
    });

    return newTemplate;
  }

  async update(dto: TemplateUpdateDto) {
    const { id, demo, prototype, categoryId, ...rest } = dto;

    const updatedDemo = demo ? await this.buildService.create(demo) : null;
    const updatedPrototype = prototype
      ? await this.buildService.create(prototype)
      : null;

    if (!updatedDemo || !updatedPrototype) {
      throw new BadRequestException('Invalid data in demo or prototype');
    }

    return this.prismaService.templates.update({
      where: {
        id
      },
      data: {
        ...rest,
        category: {
          connect: { id: categoryId }
        },
        demo: {
          connect: { id: updatedDemo.id }
        },
        prototype: {
          connect: { id: updatedPrototype.id }
        }
      },
      include: {
        demo: true,
        prototype: true
      }
    });
  }

  async delete(id: string) {
    return this.prismaService.templates.delete({
      where: {
        id
      }
    });
  }
}
