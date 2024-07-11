import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  HttpStatus,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import morganBody from 'morgan-body';
import moment from 'moment-timezone';

import { MainModule } from './module/main.module';
import { ConfigService } from './module/config/config.service';
import { setupSwagger } from './setup-swagger';
import { IncomingMessage, ServerResponse } from 'http';
import { LogProvider } from './provider/log.provider';
import { v4 as uuidV4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create<NestExpressApplication>(
    MainModule,
    new ExpressAdapter(),
    { cors: true },
  );

  const port = ConfigService.getConfig().PORT;
  const isProduction = ConfigService.isProduction();

  app.setGlobalPrefix(ConfigService.getConfig().API_VERSION, {
    exclude: [{ path: '/health', method: RequestMethod.GET }],
  });

  app.useBodyParser('text');

  app.use((req: Request, res: Response, next: NextFunction) =>
    LogProvider.scope(uuidV4(), next),
  );

  morganBody(app.getHttpAdapter().getInstance(), {
    noColors: true,
    prettify: false,
    includeNewLine: false,
    logRequestBody: true,
    logAllReqHeader: true,
    skip(_req: IncomingMessage, res: ServerResponse) {
      // if (res.statusCode >= 500) return true;
      if (_req.url === '/health') {
        return true;
      }
      return isProduction ? res.statusCode < 400 : false;
    },
    stream: {
      write: (message: string) => {
        LogProvider.info(message.replace('\n', ''), 'Http');
        return true;
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      transform: true,
      // dismissDefaultMessages: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      disableErrorMessages: false,
      validationError: {
        target: true,
        value: true,
      },
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  if (!isProduction) {
    setupSwagger(app);
  }

  await app.listen(port);

  console.info(
    `Server ${ConfigService.getConfig().ENV} running on port ${port}`,
    'APP',
  );
}

bootstrap();
