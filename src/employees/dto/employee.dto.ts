import {
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IPosition } from 'src/positions/interfaces';
import { Employee } from '../entities/employee.entity';

export class EmployeeDto implements Readonly<EmployeeDto> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @ApiProperty()
  position: IPosition;

  @ApiProperty()
  parent: Employee;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  createdAt: number;

  @ApiProperty()
  createdBy: number;

  @ApiProperty()
  updatedAt: number;

  @ApiProperty()
  updatedBy: number;

  public static from(dto: Partial<EmployeeDto>) {
    const it = new EmployeeDto();
    it.id = dto.id;
    it.name = dto.name;
    it.position = dto.position;
    it.parent = dto.parent;
    return it;
  }
}
