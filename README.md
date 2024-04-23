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

## env setup

- Create a `.env` file in the root directory.
- Copy everything from `.env.sample` and paste it in the `.env` file.
- Update the environment variable according to the local machine setup.

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

          ```
            {
                "status": "SUCCESS",
                "data": {
                    "id": 3,
                    "email": "user@example.com",
                    "isActive": true,
                    "isDeleted": false
                },
                "message": "",
                "pagination": null
            }
          ```

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

          ```
          {
                "status": "SUCCESS",
                "data": {
                    "id": 1,
                    "name": "CTO",
                    "isActive": true,
                    "isDeleted": false,
                    "createAt": "1713785792007",
                    "createdBy": null,
                    "updatedAt": "1713785792007",
                    "updatedBy": null,
                },
                "message": "",
                "pagination": null
            }
          ```

## Employee Endpoints

### Create Employee [/employees] (POST)

Create a new employee with a specified name, position, and parent (manager).

- Request (application/json)

  - Body

          ```
            {
                "name": "Sakhawat Rudro",
                "position": 4,
                "parent": 21
            }
          ```

  - Description
    - `position`: ID of the position (foreign key from Position table)
    - `parent`: ID of the parent employee (self-referencing)

- Response 201 (application/json)

  - Body

```
    {
        "status": "SUCCESS",
        "data": {
            "parent": {
                "id": 21,
                "isActive": true,
                "isDeleted": false,
                "createAt": "1713785792007",
                "createdBy": null,
                "updatedAt": "1713785792007",
                "updatedBy": null,
                "name": "Md Sakib"
            },
            "name": "Sakhawat Rudro",
            "position": 4,
            "createdBy": null,
            "updatedBy": null,
            "id": 24,
            "isActive": true,
            "isDeleted": false,
            "createAt": "1713839594603",
            "updatedAt": "1713839594604"
        },
        "message": "",
        "pagination": null
    }
```

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

**Question**: How you'd approach logging & monitoring at scale so that you can actually debug the system as it increases in complexity.

**Answer**:

1. **Structured Logging**: Implement structured logging from the outset, ensuring all logs contain relevant contextual information such as timestamps, log levels, request IDs, and user IDs.

2. **Centralized Logging**: Set up a centralized logging system using ELK stack (Elasticsearch, Logstash, Kibana) or Splunk. Direct logs from all microservices and components to this centralized platform for easy aggregation, searching, and analysis.

3. **Custom Metrics**: Define custom metrics to monitor key performance indicators (KPIs) and critical system parameters. Utilize Prometheus or StatsD to collect and visualize these metrics, enabling proactive monitoring of system health and performance.

4. **Error Tracking**: Integrate error tracking platforms like Sentry or Rollbar to capture and report errors and exceptions in real-time. Configure alerts for critical errors to ensure immediate attention and resolution.

5. **Activity Monitoring**: Implement activity monitoring to track user actions, API requests, and system events. Use tools like AWS CloudWatch Logs or Fluentd to capture and analyze activity logs for security auditing, compliance, and performance optimization.

6. **Proactive Alerting**: Set up proactive alerting mechanisms based on predefined thresholds and anomaly detection algorithms. Configure alerts for abnormal behavior, performance degradation, or security breaches to facilitate timely response and resolution.

7. **Continuous Optimization**: Regularly review and optimize logging configurations, monitoring thresholds, and alerting rules based on insights from load testing and production environments. Conduct periodic load testing to simulate realistic traffic patterns and identify potential bottlenecks or scalability issues.

By following this approach, we can establish a robust logging and monitoring framework that scales with your application's complexity. It ensures effective debugging, troubleshooting, and performance optimization while proactively addressing issues before they impact users.

## Deployment Guide:

### Security Measures:

1. **Firewall Configuration:**

   - Configure the server's firewall to allow only necessary incoming connections, such as SSH (port 22) and HTTP/HTTPS (ports 80/443).
   - Limit SSH access to trusted IP addresses and enforce key-based authentication instead of password authentication.

2. **SSL/TLS Certificates:**

   - Obtain SSL/TLS certificates from a trusted Certificate Authority (CA) like Let's Encrypt to enable HTTPS encryption for secure communication between clients and the server.
   - Configure the web server (e.g., Nginx) to use SSL/TLS certificates for HTTPS connections.

3. **Server Hardening:**
   - Regularly update the operating system and software packages to patch known vulnerabilities.
   - Disable unnecessary services and ports to reduce the attack surface.
   - Implement strong password policies and user access controls to prevent unauthorized access.

### Importance of Nginx Proxy:

- Nginx acts as a reverse proxy server, handling client requests and forwarding them to the application server.
- It improves security by isolating the application server from direct exposure to the internet, reducing the risk of attacks.
- Nginx provides features like load balancing, caching, and SSL termination, enhancing the performance and scalability of the application.

### CI/CD Pipeline Setup:

1. **Version Control (Git):**

   - Maintain the application codebase in a version control system like Git, hosted on platforms like GitHub or GitLab.

2. **Continuous Integration (CI):**

   - Configure a CI server (e.g., Jenkins, GitLab CI) to automatically build and test the application whenever changes are pushed to the repository.
   - Write unit tests and integration tests to ensure code quality and reliability.

3. **Continuous Deployment (CD):**
   - Implement a CD pipeline to automate the deployment process from staging to production environments.
   - Define deployment scripts or use deployment tools (e.g., Ansible, Docker) to provision and configure the server environment.
   - Deploy the application using containerization (e.g., Docker) for consistent deployment across different environments.
   - Integrate security scanning tools (e.g., OWASP ZAP, SonarQube) into the pipeline to identify and fix vulnerabilities in the codebase.

### Conclusion:

Deploying the application with proper security measures and a robust CI/CD pipeline ensures a streamlined deployment process and helps maintain the integrity and security of the application throughout its lifecycle. By following these best practices, we can deploy the application with confidence and respond effectively to any future changes or updates.

## Stay in touch

- Author - [Md Ataur Rahman](mailto: roomeyrahman@gmail.com)

## License

Nest is [MIT licensed](LICENSE).
