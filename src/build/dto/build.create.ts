import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class BuildCreateDto {
  @ApiProperty({
    description: 'The JSX content of the build.',
    example: '<div>Hello, World!</div>',
    required: true
  })
  @IsString()
  jsx: string;

  @ApiProperty({
    description: 'The SCSS content of the build.',
    example: 'body { background: red; }',
    required: false
  })
  @IsString()
  @IsOptional()
  scss?: string;

  @ApiProperty({
    description: 'Props for the JSX component.',
    example: { color: 'red', size: 'large' },
    required: false
  })
  @IsObject()
  @IsOptional()
  props?: Record<string, unknown>;
}
