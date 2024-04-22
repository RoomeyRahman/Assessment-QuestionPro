import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, getDataSourceToken } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { Position } from '../positions/entities/position.entity';

describe('EmployeesService', () => {
  let repository: Record<string, jest.Mock>;
  let connection: Record<string, jest.Mock>;
  let positionRepositoryMock: Record<string, jest.Mock>;
  let service: EmployeesService;

  beforeEach(async () => {
    repository = {
      save: jest.fn(),
      findOne: jest.fn(),
    };
    connection = {
      getTreeRepository: jest.fn(),
      findTrees: jest.fn(),   
    };
    positionRepositoryMock = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useValue: repository
        },
        {
          provide: getDataSourceToken(), 
          useValue: connection, 
        },
        {
          provide: getRepositoryToken(Position),
          useValue: positionRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should raised error for invalid position', async () => {
      const createEmployeeDto = {
        name: 'John Doe',
        position: 1,
      };

      const createdEmployee = {
        id: 1,
        ...createEmployeeDto,
      };

      try {
        repository.save.mockResolvedValue(createdEmployee);
        await service.create(createEmployeeDto);
      } catch (err) {
        expect(err.status).toBe(400)
        expect(err.response.message).toBe('Invalid position')
      }     
    });

    it('should create a position', async () => {
      const positionEntity = {
        id: 1,
        name: 'CTO',
      };

      positionRepositoryMock.findOne.mockResolvedValue(positionEntity);

      const createEmployeeDto = {
        name: 'John Doe',
        position: 1,
      };

      const createdEmployee = {
        id: 1,
        ...createEmployeeDto,
      };

      repository.save.mockResolvedValue(createdEmployee);
      const result = await service.create(createEmployeeDto); 
      
      expect(result).toEqual(createdEmployee);
      expect(repository.save).toHaveBeenCalledWith(createEmployeeDto);
    });
  });
});
