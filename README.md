# NestJS Skeleton

## Overview

This project is based on the NestJS framework. It is deployed on AWS Elastic Beanstalk and interacts with a PostgreSQL database using TypeORM.

## Features

- **Deployment**: Deployed on AWS Elastic Beanstalk.
- **CI/CD**: Deployment is managed through GitHub Actions.
- **Framework**: Built with NestJS.
- **Database**: Uses PostgreSQL, with TypeORM for database interactions.
- **API Documentation**: API documentation is provided via Swagger and Scalar, accessible at `/documentation` and `/reference` respectively.

## Running the app

```bash
# local debug mode
$ npm run start:localdebug

# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

- [Swagger](your-domain/documentation)
- [Scalar](your-domain/reference)

## Deployment

The application is deployed on AWS Elastic Beanstalk. When you push to the specified branch, GitHub Actions automatically deploys the application to the AWS Elastic Beanstalk environment, ensuring a smooth and continuous integration and deployment pipeline.

## Architecture

The project follows a layered architecture:

- **Controller**: Handles incoming HTTP requests and returns responses.
- **Service**: Contains business logic and interacts with repositories.
- **Repository**: Manages data access and interacts with the database using TypeORM.
- **Data**
  - **DTO (Data Transfer Object)**: Used to transfer data between layers.
  - **Entity**: Represents the database schema and is used by TypeORM to interact with the database.
