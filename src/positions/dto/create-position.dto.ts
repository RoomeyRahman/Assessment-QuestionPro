import {
	IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Designation } from '../../common/constant';

export class CreatePositionDto implements Readonly<CreatePositionDto> {
  @ApiProperty({ enum: Designation })
  @IsEnum(Designation)
  name: string;
}