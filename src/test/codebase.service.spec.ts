import { Test, TestingModule } from '@nestjs/testing';
import { CodebaseService } from '../codebase/codebase.service';
import { PrismaService } from '../prisma.service';
import { LoggerService } from '../logger';
import { CodebaseCreateDto } from '../codebase/dto/codebase.create';
import { CodebaseHelper } from '../codebase/helpers';

describe('CodebaseService', () => {
  let codebaseService: CodebaseService;
  let prismaService: PrismaService;

  const mockCodebase = {
    id: 'test-codebase-id',
    jsx: '<div>Test</div>',
    scss: '.test { color: red; }',
    props: '{"color":"red"}'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CodebaseService,
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
            codebases: {
              findUnique: jest.fn().mockResolvedValue(mockCodebase),
              create: jest.fn().mockResolvedValue(mockCodebase),
              delete: jest.fn().mockResolvedValue(mockCodebase)
            }
          }
        }
      ]
    }).compile();

    codebaseService = module.get<CodebaseService>(CodebaseService);
    prismaService = module.get<PrismaService>(PrismaService);

    // Mock CodebaseHelper
    jest.spyOn(CodebaseHelper, 'compileUniqueClasses').mockReturnValue({
      compiledJSX: '<div>Compiled</div>',
      compiledSCSS: '.compiled { color: blue; }'
    });
  });

  describe('getById', () => {
    it('should return a codebase by id', async () => {
      const result = await codebaseService.getById('test-codebase-id');

      expect(result).toEqual(mockCodebase);
      expect(prismaService.codebases.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-codebase-id' }
      });
    });
  });

  describe('create', () => {
    it('should create a new codebase with compiled classes', async () => {
      const createDto: CodebaseCreateDto = {
        jsx: '<div>Original</div>',
        scss: '.original { color: red; }',
        props: { color: 'red' }
      };

      const result = await codebaseService.create(createDto);

      expect(CodebaseHelper.compileUniqueClasses).toHaveBeenCalledWith({
        jsx: createDto.jsx,
        scss: createDto.scss
      });

      expect(prismaService.codebases.create).toHaveBeenCalledWith({
        data: {
          jsx: '<div>Compiled</div>',
          scss: '.compiled { color: blue; }',
          props: JSON.stringify(createDto.props)
        }
      });

      expect(result).toEqual(mockCodebase);
    });

    it('should create a codebase without optional fields', async () => {
      const createDto: CodebaseCreateDto = {
        jsx: '<div>Original</div>'
      };

      await codebaseService.create(createDto);

      expect(prismaService.codebases.create).toHaveBeenCalledWith({
        data: {
          jsx: '<div>Compiled</div>',
          scss: '.compiled { color: blue; }',
          props: undefined
        }
      });
    });
  });

  describe('delete', () => {
    it('should delete a codebase', async () => {
      const result = await codebaseService.delete('test-codebase-id');

      expect(result).toEqual(mockCodebase);
      expect(prismaService.codebases.delete).toHaveBeenCalledWith({
        where: { id: 'test-codebase-id' }
      });
    });
  });
});
