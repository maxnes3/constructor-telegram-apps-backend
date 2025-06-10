import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthRequestDto } from './dto/auth.request';
import { LoggerService } from '@/logger';
import { Request, Response } from 'express';
import { CurrentUser } from './decorators';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthResponseDto } from './dto';
import { Users } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly routePrefix: string;
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(AuthController.name);
    this.routePrefix = 'api/auth';
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current authorized user' })
  @ApiOkResponse({ description: 'Current user info returned.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  async getAuthUser(@CurrentUser() user: Users): Promise<AuthResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...authUser } = user;
    return authUser;
  }

  @Post('signin')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'User sign in' })
  @ApiBody({ type: AuthRequestDto, description: 'User credentials' })
  @ApiResponse({
    status: 200,
    description: 'Successful sign in. Tokens are set in cookies.'
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async signIn(
    @Body() dto: AuthRequestDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthResponseDto> {
    this.logger.debug(`Execute handle: ${this.routePrefix}/signin`);
    const {
      refreshToken,
      accessToken,
      user: response
    } = await this.authService.singIn(dto);

    this.logger.debug(`Inject accessToken to response: ${accessToken}`);
    this.authService.injectAccessToken(res, accessToken);

    this.logger.debug(`Inject refreshToken to response: ${refreshToken}`);
    this.authService.injectRefreshToken(res, refreshToken);

    this.logger.debug(`Return response: ${response}`);
    return response;
  }

  @Post('signup')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: AuthRequestDto, description: 'User registration data' })
  @ApiResponse({
    status: 200,
    description: 'Successful registration. Tokens are set in cookies.'
  })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  async signUp(
    @Body() dto: AuthRequestDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthResponseDto> {
    this.logger.debug(`Execute handle: ${this.routePrefix}/signup`);
    const {
      refreshToken,
      accessToken,
      user: response
    } = await this.authService.signUp(dto);

    this.logger.debug(`Inject accessToken to response: ${accessToken}`);
    this.authService.injectAccessToken(res, accessToken);

    this.logger.debug(`Inject refreshToken to response: ${refreshToken}`);
    this.authService.injectRefreshToken(res, refreshToken);

    this.logger.debug(`Return response: ${response}`);
    return response;
  }

  @Post('signin/access-token')
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Get new access and refresh tokens using refresh token from cookies'
  })
  @ApiResponse({
    status: 200,
    description: 'Tokens successfully refreshed. New tokens are set in cookies.'
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token is missing or invalid.'
  })
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthResponseDto> {
    this.logger.debug('Pull refreshToken from response');
    const refreshTokenFromCookies =
      this.authService.isRefreshTokenInRequest(req);

    if (!refreshTokenFromCookies) {
      this.logger.debug(
        `Remove refreshToken from response: ${refreshTokenFromCookies}`
      );
      this.authService.removeRefreshToken(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    const {
      refreshToken,
      accessToken,
      user: response
    } = await this.authService.getNewTokens(refreshTokenFromCookies);

    this.logger.debug(`Inject accessToken to response: ${accessToken}`);
    this.authService.injectAccessToken(res, accessToken);

    this.logger.debug(`Inject refreshToken to response: ${refreshToken}`);
    this.authService.injectRefreshToken(res, refreshToken);

    this.logger.debug(`Return response: ${response}`);
    return response;
  }
}
