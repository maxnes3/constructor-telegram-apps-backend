import { UserService } from '@/user/user.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequestDto } from './dto/auth.request';
import { LoggerService } from '@/logger';
import { verify } from 'argon2';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  private EXPIRE_HOURS_ACCESS_TOKEN = 5;
  private ACCESS_TOKEN_NAME = 'accessToken';

  private EXPIRE_DAY_REFRESH_TOKEN = 7;
  private REFRESH_TOKEN_NAME = 'refreshToken';

  constructor(
    private jwt: JwtService,
    private readonly userService: UserService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(AuthService.name);
  }

  async singIn(dto: AuthRequestDto) {
    this.logger.debug(`Sign In account ${JSON.stringify(dto)}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.validateUser(dto);

    const tokens = this.issueTokens(user.id);

    return {
      user,
      ...tokens
    };
  }

  async signUp(dto: AuthRequestDto) {
    const isUserExist = await this.userService.getByEmail(dto.email);

    if (isUserExist) {
      throw new BadRequestException('User already exists');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.create(dto);

    const tokens = this.issueTokens(user.id);

    return {
      user,
      ...tokens
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);

    if (!result) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.getById(result.id);

    const tokens = this.issueTokens(user.id);

    return {
      user,
      ...tokens
    };
  }

  private issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: `${this.EXPIRE_HOURS_ACCESS_TOKEN}h`
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: `${this.EXPIRE_DAY_REFRESH_TOKEN}d`
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthRequestDto) {
    this.logger.debug(`Pull user by email: ${dto.email}`);
    const user = await this.userService.getByEmail(dto.email);

    if (!user) {
      this.logger.debug('Invalid user email data');
      throw new UnauthorizedException('User not found');
    }

    const isValid = await verify(user.password, dto.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  injectAccessToken(res: Response, accessToken: string) {
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + this.EXPIRE_HOURS_ACCESS_TOKEN);

    res.cookie(this.ACCESS_TOKEN_NAME, accessToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      sameSite: 'none'
    });
  }

  isRefreshTokenInRequest(req: Request) {
    return req.cookies[this.REFRESH_TOKEN_NAME];
  }

  injectRefreshToken(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      sameSite: 'none'
    });
  }

  removeRefreshToken(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      sameSite: 'none'
    });
  }
}
