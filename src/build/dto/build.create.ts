import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class BuildCreateDto {
  @ApiProperty({
    description: 'The name with extension of the build file.',
    example: 'build.js',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The code content of the build file.',
    example: 'export const Build = { module: {} }',
    required: true
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Which operating system is the build file for.',
    example: 'windows',
    required: true
  })
  @IsString()
  os: string;

  @ApiProperty({
    description: 'Build file in src or root directory.',
    example: false,
    required: true
  })
  @IsBoolean()
  isSource: boolean;
}
