import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'The email address of the user'
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'P@ssw0rd',
    description:
      'The new password for the user, must be at least 6 characters long',
    minLength: 6
  })
  @IsOptional()
  @IsString()
  @MinLength(6, {
    message: 'The Password must consist of at least 6 characters'
  })
  password?: string;
}
