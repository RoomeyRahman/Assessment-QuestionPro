import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto, EmployeeDto } from './dto';
import { Employee } from './entities/employee.entity';
import { IEmployee } from './interfaces';
import { Position } from '../positions/entities/position.entity';

@Injectable()
export class EmployeesService {
  /**
   * Constructor
   * @param {Repository<Employee>} repository
   */
  constructor(
    @InjectRepository(Employee)
    private readonly repository,
    @InjectRepository(Position)
    private readonly positionRepo,
  ) {}

  /**
   * Create an employee
   * @param {CreateEmployeeDto} data
   * @returns {Promise<IEmployee>}
   */
  public async create(data): Promise<IEmployee> {
    try {
      const dto = new EmployeeDto();

      const position = await this.positionRepo.findOne({
        where: {
          id: data.position,
        },
      });
      if (!position) {
        throw new BadRequestException('Invalid position');
      }

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
        ...data,
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  private serializeEmployee(employee: Employee) {
    return {
      id: employee.id,
      name: employee.name,
      positionId: employee.position?.id,
      positionName: employee.position?.name,
      child: employee.child
        ? employee.child.map((child) => this.serializeEmployee(child)).flat()
        : [],
    };
  }

  /**
   * fetch record
   * @returns record[]
   */
  async findAll(): Promise<any[]> {
    try {
      // Fetch all employees
      const employees = await this.repository.find({
        relations: [
          'position',
          'child',
          'child.position',
          'child.child',
          'child.child.position',
        ],
      });
      const serializedEmployees = employees.map((employee) =>
        this.serializeEmployee(employee),
      );

      return serializedEmployees;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
