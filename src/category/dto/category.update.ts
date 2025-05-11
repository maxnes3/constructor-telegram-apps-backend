import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CategoryUpdateDto {
  @ApiProperty({
    description: 'The ID of the category.',
    example: 'category-uuid',
    required: true
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The name of the category.',
    example: 'My Category',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;
}
