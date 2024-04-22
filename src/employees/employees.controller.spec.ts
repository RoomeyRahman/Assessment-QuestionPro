import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { mockResponseEmployees } from '../common/constant';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all employees', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockResponseEmployees);

      const result = await controller.findAll();

      expect(result).toEqual(mockResponseEmployees);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findAllAuthorised', () => {
    it('should return all employees for authorised users', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockResponseEmployees);

      const result = await controller.findAll();

      expect(result).toEqual(mockResponseEmployees);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
