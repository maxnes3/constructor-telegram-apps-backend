import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class CodebaseUpdateDto {
  @ApiProperty({
    description: 'The ID of the codebase.',
    example: 'codebase-uuid',
    required: true
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The JSX content of the codebase.',
    example: '<div>Hello, World!</div>',
    required: false
  })
  @IsString()
  @IsOptional()
  jsx?: string;

  @ApiProperty({
    description: 'The SCSS content of the codebase.',
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
