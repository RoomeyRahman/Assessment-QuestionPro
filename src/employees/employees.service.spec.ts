import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { Position } from '../positions/entities/position.entity';

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
      // Mock data for testing
      const mockEmployees = [
        {
          id: 19,
          isActive: true,
          isDeleted: false,
          createAt: '1713785369567',
          createdBy: null,
          updatedAt: '1713785369567',
          updatedBy: null,
          name: 'Md Ataur Rahman',
          position: {
            id: 1,
            isActive: true,
            isDeleted: false,
            createAt: '1713780791231',
            createdBy: null,
            updatedAt: '1713780791231',
            updatedBy: null,
            name: 'CTO',
          },
          child: [
            {
              id: 21,
              isActive: true,
              isDeleted: false,
              createAt: '1713785792007',
              createdBy: null,
              updatedAt: '1713785792007',
              updatedBy: null,
              name: 'Md Sakib',
              position: {
                id: 2,
                isActive: true,
                isDeleted: false,
                createAt: '1713780791231',
                createdBy: null,
                updatedAt: '1713780791231',
                updatedBy: null,
                name: 'Senior software eng',
              },
              child: [
                {
                  id: 22,
                  isActive: true,
                  isDeleted: false,
                  createAt: '1713785792007',
                  createdBy: null,
                  updatedAt: '1713785792007',
                  updatedBy: null,
                  name: 'Md rocky',
                  position: {
                    id: 3,
                    isActive: true,
                    isDeleted: false,
                    createAt: '1713780791231',
                    createdBy: null,
                    updatedAt: '1713780791231',
                    updatedBy: null,
                    name: 'Software eng',
                  },
                },
              ],
            },
          ],
        },
        {
          id: 21,
          isActive: true,
          isDeleted: false,
          createAt: '1713785792007',
          createdBy: null,
          updatedAt: '1713785792007',
          updatedBy: null,
          name: 'Md Sakib',
          position: {
            id: 2,
            isActive: true,
            isDeleted: false,
            createAt: '1713780791231',
            createdBy: null,
            updatedAt: '1713780791231',
            updatedBy: null,
            name: 'Senior software eng',
          },
          child: [
            {
              id: 22,
              isActive: true,
              isDeleted: false,
              createAt: '1713785792007',
              createdBy: null,
              updatedAt: '1713785792007',
              updatedBy: null,
              name: 'Md rocky',
              position: {
                id: 3,
                isActive: true,
                isDeleted: false,
                createAt: '1713780791231',
                createdBy: null,
                updatedAt: '1713780791231',
                updatedBy: null,
                name: 'Software eng',
              },
              child: [],
            },
          ],
        },
        {
          id: 22,
          isActive: true,
          isDeleted: false,
          createAt: '1713785792007',
          createdBy: null,
          updatedAt: '1713785792007',
          updatedBy: null,
          name: 'Md rocky',
          position: {
            id: 3,
            isActive: true,
            isDeleted: false,
            createAt: '1713780791231',
            createdBy: null,
            updatedAt: '1713780791231',
            updatedBy: null,
            name: 'Software eng',
          },
          child: [],
        },
      ];

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
      expect(result).toEqual([
        {
          id: 19,
          name: 'Md Ataur Rahman',
          positionId: 1,
          positionName: 'CTO',
          child: [
            {
              id: 21,
              name: 'Md Sakib',
              positionId: 2,
              positionName: 'Senior software eng',
              child: [
                {
                  id: 22,
                  name: 'Md rocky',
                  positionId: 3,
                  positionName: 'Software eng',
                  child: [],
                },
              ],
            },
          ],
        },
        {
          id: 21,
          name: 'Md Sakib',
          positionId: 2,
          positionName: 'Senior software eng',
          child: [
            {
              id: 22,
              name: 'Md rocky',
              positionId: 3,
              positionName: 'Software eng',
              child: [],
            },
          ],
        },
        {
          id: 22,
          name: 'Md rocky',
          positionId: 3,
          positionName: 'Software eng',
          child: [],
        },
      ]);
      expect(serializeEmployeeSpy).toHaveBeenCalled();
    });
  });
});
