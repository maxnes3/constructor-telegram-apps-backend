import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category/category.service';
import { PrismaService } from '@/prisma.service';
import { LoggerService } from '@/logger';
import { CategoryCreateDto } from '../category/dto';
import { BadRequestException } from '@nestjs/common';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let prismaService: PrismaService;

  const mockCategory = {
    id: 'mock-category-id',
    name: 'Test Category'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: LoggerService,
          useValue: {
            setContext: jest.fn(),
            debug: jest.fn(),
            error: jest.fn()
          }
        },
        {
          provide: PrismaService,
          useValue: {
            categories: {
              findMany: jest.fn().mockResolvedValue([mockCategory]),
              findUnique: jest.fn().mockResolvedValue(mockCategory),
              create: jest.fn().mockImplementation((data) => ({
                id: 'mock-category-id',
                ...data.data
              })),
              update: jest.fn().mockImplementation(({ data }) => ({
                ...data
              })),
              delete: jest.fn().mockResolvedValue(mockCategory)
            }
          }
        }
      ]
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getAll', () => {
    it('should return all categories', async () => {
      const result = await categoryService.getAll();

      expect(result).toEqual([mockCategory]);
      expect(prismaService.categories.findMany).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a category by id', async () => {
      const result = await categoryService.getById('mock-category-id');

      expect(result).toEqual(mockCategory);
      expect(prismaService.categories.findUnique).toHaveBeenCalledWith({
        where: { id: 'mock-category-id' }
      });
    });

    it('should throw BadRequestException when finding category fails', async () => {
      jest
        .spyOn(prismaService.categories, 'findUnique')
        .mockRejectedValueOnce(new Error());

      await expect(categoryService.getById('invalid-id')).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createDto: CategoryCreateDto = {
        name: 'New Category'
      };

      const result = await categoryService.create(createDto);

      expect(result).toEqual({
        id: 'mock-category-id',
        name: createDto.name
      });
      expect(prismaService.categories.create).toHaveBeenCalledWith({
        data: createDto
      });
    });

    it('should throw BadRequestException when creation fails', async () => {
      const createDto: CategoryCreateDto = {
        name: 'New Category'
      };

      jest
        .spyOn(prismaService.categories, 'create')
        .mockRejectedValueOnce(new Error());

      await expect(categoryService.create(createDto)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      const result = await categoryService.delete('mock-category-id');

      expect(result).toEqual(mockCategory);
      expect(prismaService.categories.delete).toHaveBeenCalledWith({
        where: { id: 'mock-category-id' }
      });
    });
  });
});
