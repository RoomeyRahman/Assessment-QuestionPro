import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { EmployeesModule } from '../src/employees/employees.module';
import { EmployeesService } from '../src/employees/employees.service';
import { mockResponseEmployees } from '../src/common/constant';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let service: EmployeesService;
  let authToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    service = moduleFixture.get<EmployeesService>(EmployeesService);
    service.create = jest.fn();
    jest.spyOn(service, 'findAll').mockResolvedValue([]);
    authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyb29tZXlyYWhtYW5AZ21haWwuY29tIiwiaWF0IjoxNzEzODE4NzQ5LCJleHAiOjIzMTg2MTg3NDl9.Y8FPMzkIUhkJivBtTJ0d4uRneYiuvfd-DWnJXZCesj4';
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('/employees (GET) should return all employees', async () => {
    (service.findAll as jest.Mock).mockResolvedValue(mockResponseEmployees);

    const response = {
      status: 'SUCCESS',
      data: mockResponseEmployees,
      message: '',
      pagination: null,
    };

    return request(app.getHttpServer())
      .get('/employees')
      .expect(200)
      .expect(response);
  });

  it('/employees/authorised (GET) should unauthorized error', async () => {
    (service.findAll as jest.Mock).mockResolvedValue(mockResponseEmployees);

    const response = {
      status: 'ERROR',
      data: '',
      message: 'Unauthorized',
    };

    return request(app.getHttpServer())
      .get('/employees/authorised')
      .expect(401)
      .expect(response);
  });

  it('/employees/authorised (GET) should return all employees for authorised users', async () => {
    (service.findAll as jest.Mock).mockResolvedValue(mockResponseEmployees);

    const response = {
      status: 'SUCCESS',
      data: mockResponseEmployees,
      message: '',
      pagination: null,
    };

    return request(app.getHttpServer())
      .get('/employees/authorised')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect(response);
  });
});
