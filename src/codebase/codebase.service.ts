import { PrismaService } from '@/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CodebaseCreateDto, CodebaseUpdateDto } from './dto';
import { CodebaseHelper } from './helpers';
import { LoggerService } from '@logger/index';

@Injectable()
export class CodebaseService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(CodebaseService.name);
  }

  async getAll() {
    try {
      this.logger.debug('Pull all codebases from database');
      return this.prismaService.codebases.findMany();
    } catch (error) {
      this.logger.error('Faild to pull codebases', error);
      throw new BadRequestException('Faild to pull codebases');
    }
  }

  async getById(id: string) {
    try {
      this.logger.debug(`Pull codebase from database by id: ${id}`);
      return this.prismaService.codebases.findUnique({
        where: {
          id
        }
      });
    } catch (error) {
      this.logger.error('Faild to pull codebase', error);
      throw new BadRequestException('Faild to pull codebase');
    }
  }

  async create(dto: CodebaseCreateDto) {
    const { props, ...data } = dto;

    this.logger.debug(`Compiling unique classes by data`);
    const { compiledJSX: jsx, compiledSCSS: scss } =
      CodebaseHelper.compileUniqueClasses(data);

    this.logger.debug(`Insert codebase into database`);
    return this.prismaService.codebases.create({
      data: {
        jsx,
        scss,
        props: JSON.stringify(props) as Prisma.InputJsonValue
      }
    });
  }

  async update(dto: CodebaseUpdateDto) {
    const { id, props, jsx, scss } = dto;

    this.logger.debug(`Pull codebase from database by id: ${id}`);
    const updatedCodebase = await this.getById(id);

    if (!updatedCodebase) {
      this.logger.error('Invalid id value');
      throw new BadRequestException('Invalid id value');
    }

    this.logger.debug('Check codebase changes');
    updatedCodebase.jsx = jsx || updatedCodebase.jsx;
    updatedCodebase.scss = scss || updatedCodebase.scss;
    updatedCodebase.props = props
      ? JSON.stringify(props)
      : updatedCodebase.props;

    this.logger.debug(`Update codebase data at database by id: ${id}`);
    return this.prismaService.codebases.update({
      where: {
        id
      },
      data: updatedCodebase
    });
  }

  async delete(id: string) {
    this.logger.debug(`Delete codebase from database by id: ${id}`);
    return this.prismaService.codebases.delete({
      where: {
        id
      }
    });
  }
}
