import {
	IsString,
	MaxLength,
	IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePositionDto implements Readonly<CreatePositionDto> {
	@ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;
}