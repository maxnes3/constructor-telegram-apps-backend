import { Test, TestingModule } from '@nestjs/testing';
import { BuildService } from '@/build/build.service';
import { PrismaService } from '@/prisma.service';
import { LoggerService } from '@/logger';
import { BuildCreateDto } from '@/build/dto';
import { BadRequestException } from '@nestjs/common';

describe('BuildService', () => {
  let buildService: BuildService;
  let prismaService: PrismaService;

  const mockBuild = {
    id: 'test-build-id',
    name: 'webpack.build.js',
    code: 'module.exports = {}',
    os: 'all',
    isSource: true
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BuildService,
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
            builds: {
              findMany: jest.fn().mockResolvedValue([mockBuild]),
              findUnique: jest.fn().mockResolvedValue(mockBuild),
              create: jest.fn().mockResolvedValue(mockBuild),
              update: jest.fn().mockResolvedValue(mockBuild),
              delete: jest.fn().mockResolvedValue(mockBuild)
            }
          }
        }
      ]
    }).compile();

    buildService = module.get<BuildService>(BuildService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getAll', () => {
    it('should return all builds', async () => {
      const result = await buildService.getAll();

      expect(result).toEqual([mockBuild]);
      expect(prismaService.builds.findMany).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return build by id', async () => {
      const result = await buildService.getById('test-build-id');

      expect(result).toEqual(mockBuild);
      expect(prismaService.builds.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-build-id' }
      });
    });

    it('should throw BadRequestException when finding build fails', async () => {
      jest
        .spyOn(prismaService.builds, 'findUnique')
        .mockRejectedValueOnce(new Error());

      await expect(buildService.getById('invalid-id')).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('getForOS', () => {
    it('should return builds for specific OS and all OS', async () => {
      const currentOS = 'macos';
      await buildService.getForOS(currentOS);

      expect(prismaService.builds.findMany).toHaveBeenCalledWith({
        where: {
          OR: [{ os: currentOS }, { os: 'all' }]
        }
      });
    });
  });

  describe('create', () => {
    it('should create new build', async () => {
      const createDto: BuildCreateDto = {
        name: 'package.json',
        code: '{}',
        os: 'windows',
        isSource: false
      };

      const result = await buildService.create(createDto);

      expect(result).toEqual(mockBuild);
      expect(prismaService.builds.create).toHaveBeenCalledWith({
        data: createDto
      });
    });

    it('should throw BadRequestException when creation fails', async () => {
      const createDto: BuildCreateDto = {
        name: 'invalid.json',
        code: '{}',
        os: 'windows',
        isSource: false
      };

      jest
        .spyOn(prismaService.builds, 'create')
        .mockRejectedValueOnce(new Error());

      await expect(buildService.create(createDto)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('delete', () => {
    it('should delete build', async () => {
      const result = await buildService.delete('test-build-id');

      expect(result).toEqual(mockBuild);
      expect(prismaService.builds.delete).toHaveBeenCalledWith({
        where: { id: 'test-build-id' }
      });
    });
  });
});
