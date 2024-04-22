import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
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
    private readonly repository,
    @InjectConnection() private connection: Connection,
  ) { }

  /**
   * Create an employee
   * @param {CreateEmployeeDto} data
   * @returns {Promise<IEmployee>}
   */
  public async create(data: CreateEmployeeDto): Promise<IEmployee> {
    try {
      const dto = new EmployeeDto();
      if (data?.parent) {
          const parent = await this.repository.findOne({
            where: {
              id: data.parent,
            },
          });
          dto.parent = parent;
          delete data.parent;
      }

      return await this.repository.save({
        ...dto,
        ...data
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  private serializeEmployees(employees: Employee[]): any[] {
    return employees.map(employee => ({
      id: employee.id,
      name: employee.name,
      positionId: employee.position.id,
      positionName: employee.position.name,
      child: this.serializeEmployees(employee.child),
    }));
  }

  /**
   * fetch record
   * @returns record[]
   */
  async findAll() {
    try {
      const employeeTreeRepository = this.connection.getTreeRepository(Employee);
      const employees = await employeeTreeRepository.findTrees({
        relations: ['position'],
      });
      return this.serializeEmployees(employees);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }
}