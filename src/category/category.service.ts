import { PrismaService } from '@/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryCreateDto, CategoryUpdateDto } from './dto';
import { LoggerService } from '@/logger';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(CategoryService.name);
  }

  async getAll() {
    this.logger.debug('Pull all categories from database');
    return this.prismaService.categories.findMany();
  }

  async getById(id: string) {
    try {
      this.logger.debug(`Pull category from database by id: ${id}`);
      const category = await this.prismaService.categories.findUnique({
        where: { id }
      });
      return category;
    } catch (error) {
      this.logger.error(`Invalid id value: ${error}`);
      throw new BadRequestException('Invalid id value', error);
    }
  }

  async create(data: CategoryCreateDto) {
    try {
      this.logger.debug(`Insert category into database`);
      const newCategory = await this.prismaService.categories.create({
        data
      });
      return newCategory;
    } catch (error) {
      this.logger.error(`Invalid data: ${error}`);
      throw new BadRequestException('Invalid data', error);
    }
  }

  async update(dto: CategoryUpdateDto) {
    const { id, name } = dto;

    this.logger.debug(`Pull category from database by id: ${id}`);
    const updatedCategory = await this.getById(id);

    if (!updatedCategory) {
      this.logger.error('Invalid id value');
      throw new BadRequestException('Invalid id value');
    }

    this.logger.debug('Check category changes');
    updatedCategory.name = name || updatedCategory.name;

    this.logger.debug(`Update category data at database by id: ${id}`);
    return this.prismaService.categories.update({
      where: {
        id
      },
      data: updatedCategory
    });
  }

  async delete(id: string) {
    this.logger.debug(`Delete category from database by id: ${id}`);
    return this.prismaService.categories.delete({
      where: {
        id
      }
    });
  }
}
