<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Tech Stack

- **NestJS**
- **PostgreSQL**
- **TypeORM**

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

This API documentation outlines the endpoints and functionalities of this application.

### Authentication

Authentication is required for certain endpoints. The API uses JWT (JSON Web Tokens) for authentication. Users need to register and login to obtain an access token.

### Register User [/users] (POST)

Register a new user with email and password.

- Request (application/json)

  - Body

          {
              "email": "user@example.com",
              "password": "password123"
          }

- Response 201 (application/json)

  - Body

          {
              "message": "User registered successfully"
          }

### Login [/login] (POST)

Authenticate a user with email and password. Returns an access token in the response header.

- Request (application/json)

  - Body

          {
              "email": "user@example.com",
              "password": "password123"
          }

- Response 200 (application/json)

  - Headers

          X-API-KEY: <access_token>
          X-API-KEY-EXPIRES: <time in ms>

  - Body

          {
              "id": 1,
              "email": "user@example.com"
          }

## Position Endpoints

### Create Position [/positions] (POST)

Create a new position with a specified name.

- Request (application/json)

  - Body

          {
              "name": "CTO"
          }

- Response 201 (application/json)

  - Body

          {
              "message": "Position created successfully"
          }

## Employee Endpoints

### Create Employee [/employees] (POST)

Create a new employee with a specified name, position, and parent (manager).

- Request (application/json)

  - Body

          {
              "name": "John Doe",
              "position": 1,
              "parent": 2
          }

  - Description
    - `position`: ID of the position (foreign key from Position table)
    - `parent`: ID of the parent employee (self-referencing)

- Response 201 (application/json)

  - Body

          {
              "message": "Employee created successfully"
          }

### Get All Employees [/employees] (GET)

Retrieve all employees from the database.

- Response 200 (application/json)

  - Body

```
    {
        "status": "SUCCESS",
        "data": [
            {
                "id": 19,
                "name": "Md Ataur Rahman",
                "positionId": 1,
                "positionName": "CTO",
                "child": [
                    {
                        "id": 21,
                        "name": "Md Sakib",
                        "positionId": 2,
                        "positionName": "Senior software eng",
                        "child": [
                            {
                                "id": 22,
                                "name": "Md rocky",
                                "positionId": 3,
                                "positionName": "Software eng",
                                "child": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 21,
                "name": "Md Sakib",
                "positionId": 2,
                "positionName": "Senior software eng",
                "child": [
                    {
                        "id": 22,
                        "name": "Md rocky",
                        "positionId": 3,
                        "positionName": "Software eng",
                        "child": []
                    }
                ]
            },
            {
                "id": 22,
                "name": "Md rocky",
                "positionId": 3,
                "positionName": "Software eng",
                "child": []
            }
        ],
        "message": "",
        "pagination": null
    }
```

### Get All Authorized Employees [/employees/authorised] (GET)

Retrieve all employees from the database. Requires a valid JWT token in the `Authorization` header.

- Headers

  Authorization: Bearer <access_token>

- Response 200 (application/json)

  - Body

```
    {
        "status": "SUCCESS",
        "data": [
            {
                "id": 19,
                "name": "Md Ataur Rahman",
                "positionId": 1,
                "positionName": "CTO",
                "child": [
                    {
                        "id": 21,
                        "name": "Md Sakib",
                        "positionId": 2,
                        "positionName": "Senior software eng",
                        "child": [
                            {
                                "id": 22,
                                "name": "Md rocky",
                                "positionId": 3,
                                "positionName": "Software eng",
                                "child": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 21,
                "name": "Md Sakib",
                "positionId": 2,
                "positionName": "Senior software eng",
                "child": [
                    {
                        "id": 22,
                        "name": "Md rocky",
                        "positionId": 3,
                        "positionName": "Software eng",
                        "child": []
                    }
                ]
            },
            {
                "id": 22,
                "name": "Md rocky",
                "positionId": 3,
                "positionName": "Software eng",
                "child": []
            }
        ],
        "message": "",
        "pagination": null
    }
```

## More inside of logging and monitoring

Question: How you'd approach logging & monitoring at scale so that you can actually debug the system as it increases in complexity.

Answer: To handle logging and monitoring at scale, I would implement structured logging with a centralized logging system like ELK stack or Splunk. Additionally, I'd integrate custom metrics, error tracking, and proactive alerting mechanisms. Continuous refinement of logging configurations and monitoring dashboards ensures effective debugging and troubleshooting as the system complexity grows.

## Stay in touch

- Author - [Md Ataur Rahman](mailto: roomeyrahman@gmail.com)

## License

Nest is [MIT licensed](LICENSE).
