import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BuildCreateDto {
  @ApiProperty({
    description: 'The HTML content of the build.',
    example: '<div>Hello, World!</div>',
    required: false
  })
  @IsString()
  html?: string;

  @ApiProperty({
    description: 'The CSS content of the build.',
    example: 'body { background: red; }',
    required: false
  })
  @IsString()
  css?: string;
}
