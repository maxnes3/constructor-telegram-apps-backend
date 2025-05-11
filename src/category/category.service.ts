import { PrismaService } from '@/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryCreateDto, CategoryUpdateDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.categories.findMany();
  }

  async getById(id: string) {
    try {
      const category = await this.prismaService.categories.findUnique({
        where: { id }
      });
      return category;
    } catch (error) {
      throw new BadRequestException('Invalid id value', error);
    }
  }

  async create(data: CategoryCreateDto) {
    const newCategory = await this.prismaService.categories.create({
      data
    });
    return newCategory;
  }

  async update(dto: CategoryUpdateDto) {
    const { id, name } = dto;

    const updatedCategory = await this.getById(id);

    if (!updatedCategory) {
      throw new BadRequestException('Invalid id value');
    }

    updatedCategory.name = name || updatedCategory.name;

    return this.prismaService.categories.update({
      where: {
        id
      },
      data: updatedCategory
    });
  }

  async delete(id: string) {
    return this.prismaService.categories.delete({
      where: {
        id
      }
    });
  }
}
