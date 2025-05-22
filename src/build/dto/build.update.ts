import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class BuildUpdateDto {
  @ApiProperty({
    description: 'The ID of the build file.',
    example: 'build-file-uuid',
    required: true
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The name with extension of the build file.',
    example: 'build.js',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The code content of the build file.',
    example: 'export const Build = { module: {} }',
    required: false
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: 'Which operating system is the build file for.',
    example: 'windows',
    required: false
  })
  @IsString()
  @IsOptional()
  os?: string;

  @ApiProperty({
    description: 'Build file in src or root directory.',
    example: false,
    required: true
  })
  @IsBoolean()
  @IsOptional()
  isSource?: boolean;
}
