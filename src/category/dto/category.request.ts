import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreateRequestDto {
  @ApiProperty({
    description: 'The name of the category.',
    example: 'My Category'
  })
  name: string;
}
