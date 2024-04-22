import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePositionDto, PositionDto } from './dto';
import { Position } from './entities/position.entity';
import { IPosition } from './interfaces';

@Injectable()
export class PositionsService {
  /**
   * Constructor
   * @param {Repository<Position>} repository
   */
  constructor(
    @InjectRepository(Position)
    private readonly repository: Repository<Position>,
  ) { }


  /**
   * Create a position
   * @param {CreatePositionDto} data
   * @returns {Promise<IPosition>}
   */
  public async create(data: CreatePositionDto): Promise<IPosition> {
    try {
      const record = await this.repository.save(data);

      return PositionDto.fromEntity(record);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all positions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} position`;
  }
}
