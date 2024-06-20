import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { ExceptionMessage } from 'src/constant/exception';
import { HttpError, OkbError, ServiceError } from 'src/types/exception';

@Catch(HttpError, ServiceError, OkbError)
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpError | ServiceError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof ServiceError) {
      Logger.error(exception.stack);
    }

    response
      .status(exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        result: false,
        code: exception.code || 'INTERNAL_SERVER_ERROR',
        message: exception.message || ExceptionMessage[exception.code],
      });
  }
}
