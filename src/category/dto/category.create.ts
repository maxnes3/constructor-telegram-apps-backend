import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryCreateDto {
  @ApiProperty({
    description: 'The name of the category.',
    example: 'My Category',
    required: true
  })
  @IsString()
  name: string;
}
