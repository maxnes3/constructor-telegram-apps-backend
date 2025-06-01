import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from './dto';
import { LoggerService } from '@/logger';
import { PrismaService } from '@/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(UserService.name);
  }

  async getAll() {
    try {
      const users = await this.prismaService.users.findMany();
      return users;
    } catch (error) {
      throw new BadRequestException('Invalid request', error);
    }
  }

  async getById(id: string) {
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          id
        }
      });
      return user;
    } catch (error) {
      throw new BadRequestException('Invalid id value', error);
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          email
        }
      });
      return user;
    } catch (error) {
      throw new NotFoundException('Invalid email value', error);
    }
  }

  async create(dto: UserCreateDto) {
    try {
      const data = {
        email: dto.email,
        password: await hash(dto.password)
      };
      const user = await this.prismaService.users.create({
        data
      });
      return user;
    } catch (error) {
      throw new BadRequestException('Invalid user data', error);
    }
  }

  async update(dto: UserUpdateDto) {
    return `This action updates a #${dto} user`;
  }

  async delete(id: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = await this.prismaService.users.delete({
        where: {
          id
        }
      });
      return user;
    } catch (error) {
      throw new NotFoundException('Invalid id value', error);
    }
  }
}
