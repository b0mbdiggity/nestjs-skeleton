import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { ConfigService } from '../config/config.service';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: ConfigService.getConfig().DB_INFO.host,
      port: ConfigService.getConfig().DB_INFO.port,
      username: ConfigService.getConfig().DB_INFO.user,
      password: ConfigService.getConfig().DB_INFO.password,
      database: ConfigService.getConfig().DB_INFO.database,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: ConfigService.getConfig().DB_INFO.sync,
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
      parseInt8: true,
      extra: {
        connectionLimit: ConfigService.getConfig().DB_INFO.max,
      },
    };
  }
}
