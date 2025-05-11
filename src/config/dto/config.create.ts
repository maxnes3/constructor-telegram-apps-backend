import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class ConfigCreateDto {
  @ApiProperty({
    description: 'The name with extension of the configuration file.',
    example: 'config.js',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The code content of the configuration file.',
    example: 'export const Config = { module: {} }',
    required: true
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Which operating system is the configuration file for.',
    example: 'windows',
    required: true
  })
  @IsString()
  os: string;

  @ApiProperty({
    description: 'Config file in src or root directory.',
    example: false,
    required: true
  })
  @IsBoolean()
  isSource: boolean;
}
