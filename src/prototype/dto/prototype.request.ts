import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PrototypeCreateRequestDto {
  @ApiProperty({
    description: 'The name of the prototype model.',
    example: 'My Prototype Model',
    required: true
  })
  @IsString()
  modelName: string;

  @ApiProperty({
    description: 'The aspect ratio (width) of the prototype.',
    example: 16,
    required: true
  })
  @IsNumber()
  aspectRatioX: number;

  @ApiProperty({
    description: 'The aspect ratio (height) of the prototype.',
    example: 9,
    required: true
  })
  @IsNumber()
  aspectRatioY: number;

  @ApiProperty({
    description: 'The border width of the prototype.',
    example: '1px',
    required: true
  })
  @IsString()
  borderWidth: string;

  @ApiProperty({
    description: 'The border radius of the prototype.',
    example: '5px',
    required: true
  })
  @IsString()
  borderRadius: string;
}
