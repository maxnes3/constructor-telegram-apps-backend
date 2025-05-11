import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class BuildUpdateDto {
  @ApiProperty({
    description: 'The ID of the build.',
    example: 'build-uuid',
    required: true
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The JSX content of the build.',
    example: '<div>Hello, World!</div>',
    required: false
  })
  @IsString()
  @IsOptional()
  jsx?: string;

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
