import { IsString, MaxLength, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto implements Readonly<CreateEmployeeDto> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @ApiProperty()
  position: number;

  @ApiProperty()
  parent: number;
}
