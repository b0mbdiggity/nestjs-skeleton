import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { ValidationExceptionFilter } from 'src/filter/parameter-validator-exception.filter';
import { NotFoundExceptionFilter } from 'src/filter/not-found-exception.filter';
import { InternalServerErrorFilter } from './../filter/internal-server-exception.filter';
import { ForbiddenExceptionFilter } from 'src/filter/forbidden-exception.filter';
import { HealthController } from './health/health.controller';
import { ConfigService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DatabaseConfigModule } from './database/database.module';
import { DatabaseConfigService } from './database/database.service';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { HttpClientModule } from './httpClient/httpClient.module';
import { SampleModule } from './sample/sample.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useClass: DatabaseConfigService,
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    HttpClientModule,
    SampleModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ForbiddenExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class MainModule {}
