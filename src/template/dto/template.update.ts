import { ApiProperty } from '@nestjs/swagger';
import { BuildCreateDto } from '@build/index';
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
    description: 'The demo build data.',
    type: BuildCreateDto,
    required: false
  })
  @IsObject()
  @IsOptional()
  demo?: BuildCreateDto;

  @ApiProperty({
    description: 'The prototype build data.',
    type: BuildCreateDto,
    required: false
  })
  @IsObject()
  @IsOptional()
  prototype?: BuildCreateDto;
}
