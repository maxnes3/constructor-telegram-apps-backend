import { ScreenCreateDto } from '@/screen/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class ProjectRequestDto {
  @ApiProperty({
    description: 'The ID of the project.',
    example: 'project-uuid',
    required: false
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: 'The name of project.',
    example: 'My Project',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The list of screens for the project.',
    type: [ScreenCreateDto],
    example: [
      {
        name: 'Home Screen',
        isStartScreen: true,
        templates: ['template-uuid-1', 'template-uuid-2']
      },
      {
        name: 'Settings Screen',
        isStartScreen: false,
        templates: ['template-uuid-3']
      }
    ]
  })
  @IsArray()
  screens: ScreenCreateDto[];

  @ApiProperty({
    description: 'The os of user browser.',
    example: 'macos',
    required: false
  })
  @IsOptional()
  @IsString()
  browserOS?: string;
}
