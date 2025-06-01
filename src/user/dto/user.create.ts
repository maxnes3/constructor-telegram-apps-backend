import { IsEmail, IsString } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
