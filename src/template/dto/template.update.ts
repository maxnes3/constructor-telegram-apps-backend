import { ApiProperty } from '@nestjs/swagger';
import { CodebaseCreateDto } from '@codebase/index';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class TemplateUpdateDto {
  @ApiProperty({
    description: 'The ID of the template.',
    example: 'template-uuid',
    required: true
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The name of the template.',
    example: 'My Template',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The ID of the category to which the template belongs.',
    example: 'category-uuid',
    required: false
  })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    description: 'The position behaviour of the template.',
    example: 'isFill',
    required: false
  })
  @IsString()
  @IsOptional()
  positionBehaviour?: string;

  @ApiProperty({
    description: 'The develop build data.',
    type: CodebaseCreateDto,
    required: false
  })
  @IsObject()
  @IsOptional()
  develop?: CodebaseCreateDto;

  @ApiProperty({
    description: 'The running build data.',
    type: CodebaseCreateDto,
    required: false
  })
  @IsObject()
  @IsOptional()
  running?: CodebaseCreateDto;
}
