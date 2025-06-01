import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthRequestDto {
  @ApiProperty({
    description: 'The email of user.',
    example: 'example@gmail.com',
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of user.',
    example: 'example1234',
    required: true
  })
  @MinLength(6, {
    message: 'Password must be at least 6 characters long'
  })
  @IsString()
  password: string;
}
