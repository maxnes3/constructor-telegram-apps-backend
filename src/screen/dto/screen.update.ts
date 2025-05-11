import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class ScreenUpdateDto {
  @ApiProperty({
    description: 'The ID of the screen.',
    example: 'screen-uuid',
    required: true
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The name of the screen.',
    example: 'Home Screen',
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The screen is a start screen?',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isStartScreen?: boolean;

  @ApiProperty({
    description: 'The templates at screen',
    example: ['template-uuid-1', 'template-uuid-2'],
    required: false
  })
  @IsOptional()
  @IsArray()
  templatesIds?: string[];
}
