import { ApiProperty } from '@nestjs/swagger';
import { BuildCreateDto } from '@build/index';
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
    description: 'The demo build data.',
    type: BuildCreateDto,
    required: true
  })
  @IsObject()
  demo: BuildCreateDto;

  @ApiProperty({
    description: 'The prototype build data.',
    type: BuildCreateDto,
    required: true
  })
  @IsObject()
  prototype: BuildCreateDto;
}
