import {
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Position } from '../entities/position.entity';

export class PositionDto implements Readonly<PositionDto> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

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

  public static from(dto: Partial<PositionDto>) {
    const it = new PositionDto();
    it.id = dto.id;
    it.name = dto.name;
    return it;
  }

  public static fromEntity(entity: Position) {
    return this.from({
        id: entity.id,
        name: entity.name,
    });
  }
}
