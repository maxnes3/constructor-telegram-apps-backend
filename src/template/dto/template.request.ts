import { ApiProperty } from '@nestjs/swagger';
import { BuildCreateDto } from './build';
import { IsString } from 'class-validator';

export class TemplateCreateRequestDto {
  @ApiProperty({
    description: 'The name of the template.',
    example: 'My Template'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The ID of the category to which the template belongs.',
    example: 'category-uuid'
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    description: 'The position behaviour of the template.',
    example: 'isFill',
    required: false
  })
  @IsString()
  positionBehaviour?: string;

  @ApiProperty({
    description: 'The demo build data.',
    type: BuildCreateDto
  })
  demo: BuildCreateDto;

  @ApiProperty({
    description: 'The prototype build data.',
    type: BuildCreateDto
  })
  prototype: BuildCreateDto;
}
