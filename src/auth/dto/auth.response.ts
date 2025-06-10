import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthResponseDto {
  @ApiProperty({
    description: 'The id of auth user.',
    example: 'uuid-auth-user',
    required: true
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The email of auth user.',
    example: 'example@gmail.com',
    required: true
  })
  @IsEmail()
  email: string;
}
