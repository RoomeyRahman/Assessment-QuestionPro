import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto, EmployeeDto } from './dto';
import { Employee } from './entities/employee.entity';
import { IEmployee } from './interfaces';

@Injectable()
export class EmployeesService {
  /**
   * Constructor
   * @param {Repository<Position>} repository
   */
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) { }

  /**
   * Create an employee
   * @param {CreateEmployeeDto} data
   * @returns {Promise<IEmployee>}
   */
  public async create(data: CreateEmployeeDto): Promise<IEmployee> {
    try {
      return await this.repository.save(data);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }


  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }
}
