import { PrismaService } from '@/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TemplateCreateDto, TemplateUpdateDto } from './dto';
import { CodebaseService } from '@codebase/index';
import { LoggerService } from '@/logger';

@Injectable()
export class TemplateService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly codebaseService: CodebaseService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(TemplateService.name);
  }

  async getAll() {
    this.logger.debug('Pull all templates with codebases from database');
    return this.prismaService.templates.findMany({
      include: { develop: true, running: true }
    });
  }

  async getById(id: string) {
    try {
      this.logger.debug(
        `Pull template with codebases from database by id: ${id}`
      );
      const template = await this.prismaService.templates.findUnique({
        where: { id },
        include: { develop: true, running: true }
      });
      return template;
    } catch (error) {
      this.logger.error(`Invalid id value: ${error}`);
      throw new BadRequestException('Invalid id value', error);
    }
  }

  async getTemplatesByIds(ids: string[]) {
    this.logger.debug(
      `Pull templates with codebases from database by many id: [${ids.join(', ')}]`
    );
    return this.prismaService.templates.findMany({
      where: {
        id: { in: ids }
      },
      include: {
        running: true,
        develop: true
      }
    });
  }

  async create(dto: TemplateCreateDto) {
    try {
      const { develop, running, categoryId, ...rest } = dto;

      this.logger.debug('Create develop and running codebases');
      const createdDevelop = await this.codebaseService.create(develop);
      const createdRunning = await this.codebaseService.create(running);

      if (!createdDevelop || !createdRunning) {
        this.logger.error('Invalid data in develop or running');
        throw new BadRequestException('Invalid data in develop or running');
      }

      this.logger.debug(`Insert template into database`);
      const newTemplate = await this.prismaService.templates.create({
        data: {
          ...rest,
          category: {
            connect: { id: categoryId }
          },
          develop: {
            connect: { id: createdDevelop.id }
          },
          running: {
            connect: { id: createdRunning.id }
          }
        },
        include: {
          develop: true,
          running: true
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
      const { id, develop, running, categoryId, ...rest } = dto;

      this.logger.debug('Update develop and running codebases');
      const updatedDevelop = develop
        ? await this.codebaseService.create(develop)
        : null;
      const updatedRunning = running
        ? await this.codebaseService.create(running)
        : null;

      if (!updatedDevelop || !updatedRunning) {
        this.logger.error('Invalid data in develop or running');
        throw new BadRequestException('Invalid data in develop or running');
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
          develop: {
            connect: { id: updatedDevelop.id }
          },
          running: {
            connect: { id: updatedRunning.id }
          }
        },
        include: {
          develop: true,
          running: true
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
