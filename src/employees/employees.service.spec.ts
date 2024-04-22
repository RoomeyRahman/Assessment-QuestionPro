import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { Position } from '../positions/entities/position.entity';
import { mockEmployees, mockResponseEmployees } from '../common/constant';

describe('EmployeesService', () => {
  let repository: Record<string, jest.Mock>;
  let positionRepositoryMock: Record<string, jest.Mock>;
  let service: EmployeesService;
  let serializeEmployeeSpy: jest.SpyInstance<any>;

  beforeEach(async () => {
    repository = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
    };
    positionRepositoryMock = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useValue: repository,
        },
        {
          provide: getRepositoryToken(Position),
          useValue: positionRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    serializeEmployeeSpy = jest.spyOn(service as any, 'serializeEmployee');
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
        expect(err.status).toBe(400);
        expect(err.response.message).toBe('Invalid position');
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

  describe('findAll', () => {
    it('should return all employees with correct serialization', async () => {
      // Mock the behavior of the repository's find method
      repository.find.mockResolvedValue(mockEmployees);

      // Call the service method
      const result = await service.findAll();

      // Verify that the repository method was called with the correct arguments
      expect(repository.find).toHaveBeenCalledWith({
        relations: [
          'position',
          'child',
          'child.position',
          'child.child',
          'child.child.position',
        ],
      });

      // Verify the result
      expect(result).toEqual(mockResponseEmployees);
      expect(serializeEmployeeSpy).toHaveBeenCalled();
    });
  });
});
