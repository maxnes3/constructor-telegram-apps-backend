import { ApiProperty } from '@nestjs/swagger';
import { CodebaseCreateDto } from '@codebase/index';
import { IsObject, IsString } from 'class-validator';

export class TemplateCreateDto {
  @ApiProperty({
    description: 'The name of the template.',
    example: 'My Template',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The ID of the category to which the template belongs.',
    example: 'category-uuid',
    required: true
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    description: 'The position behaviour of the template.',
    example: 'isFill',
    required: true
  })
  @IsString()
  positionBehaviour: string;

  @ApiProperty({
    description: 'The develop build data.',
    type: CodebaseCreateDto,
    required: true
  })
  @IsObject()
  develop: CodebaseCreateDto;

  @ApiProperty({
    description: 'The running build data.',
    type: CodebaseCreateDto,
    required: true
  })
  @IsObject()
  running: CodebaseCreateDto;
}
