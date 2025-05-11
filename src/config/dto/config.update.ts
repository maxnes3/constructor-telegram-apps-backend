import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ConfigUpdateDto {
  @ApiProperty({
    description: 'The ID of the configuration file.',
    example: 'configuration-file-uuid',
    required: true
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The name with extension of the configuration file.',
    example: 'config.js',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The code content of the configuration file.',
    example: 'export const Config = { module: {} }',
    required: false
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: 'Which operating system is the configuration file for.',
    example: 'windows',
    required: false
  })
  @IsString()
  @IsOptional()
  os?: string;

  @ApiProperty({
    description: 'Config file in src or root directory.',
    example: false,
    required: true
  })
  @IsBoolean()
  @IsOptional()
  isSource?: boolean;
}
