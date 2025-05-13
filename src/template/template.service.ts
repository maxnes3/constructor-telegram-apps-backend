import { PrismaService } from '@/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TemplateCreateDto, TemplateUpdateDto } from './dto';
import { BuildService } from '@build/index';
import { LoggerService } from '@/logger';

@Injectable()
export class TemplateService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly buildService: BuildService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(TemplateService.name);
  }

  async getAll() {
    this.logger.debug('Pull all templates with builds from database');
    return this.prismaService.templates.findMany({
      include: { demo: true, prototype: true }
    });
  }

  async getById(id: string) {
    try {
      this.logger.debug(`Pull template with builds from database by id: ${id}`);
      const template = await this.prismaService.templates.findUnique({
        where: { id },
        include: { demo: true, prototype: true }
      });
      return template;
    } catch (error) {
      this.logger.error(`Invalid id value: ${error}`);
      throw new BadRequestException('Invalid id value', error);
    }
  }

  async getTemplatesByIds(ids: string[]) {
    this.logger.debug(
      `Pull templates with builds from database by many id: [${ids.join(', ')}]`
    );
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
    try {
      const { demo, prototype, categoryId, ...rest } = dto;

      this.logger.debug('Create demo and prototype builds');
      const createdDemo = await this.buildService.create(demo);
      const createdPrototype = await this.buildService.create(prototype);

      if (!createdDemo || !createdPrototype) {
        this.logger.error('Invalid data in demo or prototype');
        throw new BadRequestException('Invalid data in demo or prototype');
      }

      this.logger.debug(`Insert template into database`);
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
    } catch (error) {
      this.logger.error(`Invalid data: ${error}`);
      throw new BadRequestException('Invalid data', error);
    }
  }

  async update(dto: TemplateUpdateDto) {
    try {
      const { id, demo, prototype, categoryId, ...rest } = dto;

      this.logger.debug('Update demo and prototype builds');
      const updatedDemo = demo ? await this.buildService.create(demo) : null;
      const updatedPrototype = prototype
        ? await this.buildService.create(prototype)
        : null;

      if (!updatedDemo || !updatedPrototype) {
        this.logger.error('Invalid data in demo or prototype');
        throw new BadRequestException('Invalid data in demo or prototype');
      }

      this.logger.debug(`Update template data at database by id: ${id}`);
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
    } catch (error) {
      this.logger.error(`Invalid data: ${error}`);
      throw new BadRequestException('Invalid data', error);
    }
  }

  async delete(id: string) {
    this.logger.debug(`Delete template from database by id: ${id}`);
    return this.prismaService.templates.delete({
      where: {
        id
      }
    });
  }
}
