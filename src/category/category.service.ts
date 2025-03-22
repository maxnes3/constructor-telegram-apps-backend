import { PrismaService } from '@/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryCreateRequestDto } from './dto';

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

  async create(data: CategoryCreateRequestDto) {
    const newCategory = await this.prismaService.categories.create({
      data
    });
    return newCategory;
  }

  async delete(id: string) {
    return this.prismaService.categories.delete({
      where: {
        id
      }
    });
  }
}
