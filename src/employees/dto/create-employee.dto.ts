import { IsString, MaxLength, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../entities/employee.entity';
import { Position } from 'aws-sdk/clients/codecommit';
import { IPosition } from 'src/positions/interfaces';

export class CreateEmployeeDto implements Readonly<CreateEmployeeDto> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @ApiProperty()
  position: IPosition;

  @ApiProperty()
  parent: Employee;
}
