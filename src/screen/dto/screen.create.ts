import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class ScreenCreateDto {
  @ApiProperty({
    description: 'The name of the screen.',
    example: 'Home Screen',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The ID of project owner.',
    example: 'project-uuid',
    required: false
  })
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiProperty({
    description: 'The screen is a start screen?',
    example: false,
    required: false
  })
  @IsBoolean()
  isStartScreen: boolean;

  @ApiProperty({
    description: 'The templates at screen',
    example: ['template-uuid-1', 'template-uuid-2'],
    required: true
  })
  @IsArray()
  templatesIds: string[];
}
