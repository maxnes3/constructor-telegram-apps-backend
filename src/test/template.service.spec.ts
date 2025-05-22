import { Test, TestingModule } from '@nestjs/testing';
import { TemplateService } from '../template/template.service';
import { PrismaService } from '../prisma.service';
import { CodebaseService } from '@codebase/index';
import { LoggerService } from '@/logger';
import { TemplateCreateDto } from '../template/dto';

describe('TemplateService', () => {
  let templateService: TemplateService;
  let prismaService: PrismaService;
  let createdTemplateId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateService,
        {
          provide: CodebaseService,
          useValue: {
            create: jest.fn().mockImplementation((dto) => ({
              id: 'mock-codebase-id',
              ...dto
            }))
          }
        },
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
            templates: {
              create: jest.fn().mockImplementation((data) => ({
                id: 'mock-template-id',
                ...data.data
              })),
              delete: jest.fn().mockResolvedValue({ id: 'mock-template-id' })
            }
          }
        }
      ]
    }).compile();

    templateService = module.get<TemplateService>(TemplateService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create and cleanup', () => {
    it('should create a template and then delete it', async () => {
      // Prepare test data
      const createTemplateDto: TemplateCreateDto = {
        name: 'Test Template',
        categoryId: 'mock-category-id',
        positionBehaviour: 'isFill',
        develop: {
          jsx: '<div>Develop</div>',
          scss: '.develop { color: red; }'
        },
        running: {
          jsx: '<div>Running</div>',
          scss: '.running { color: blue; }'
        }
      };

      try {
        // Create template
        const createdTemplate = await templateService.create(createTemplateDto);
        createdTemplateId = createdTemplate.id;

        // Verify template was created
        expect(createdTemplate).toBeDefined();
        expect(createdTemplate.name).toBe(createTemplateDto.name);
        expect(createdTemplate.positionBehaviour).toBe(
          createTemplateDto.positionBehaviour
        );

        // Verify codebases were created
        expect(createdTemplate.develop).toBeDefined();
        expect(createdTemplate.running).toBeDefined();
      } finally {
        // Cleanup: Delete the created template
        if (createdTemplateId) {
          await templateService.delete(createdTemplateId);

          // Verify the delete was called
          expect(prismaService.templates.delete).toHaveBeenCalledWith({
            where: { id: createdTemplateId }
          });
        }
      }
    });
  });
});
