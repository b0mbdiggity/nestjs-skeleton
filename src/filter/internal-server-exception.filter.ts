import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { ExceptionCode, ExceptionMessage } from 'src/constant/exception';
import { ReportProvider } from 'src/provider/report.provider';

@Catch()
export class InternalServerErrorFilter extends BaseExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const { method, body, query, params, url, headers, _startTime } =
      http.getRequest();

    ReportProvider.report(exception, {
      method,
      body,
      query,
      params,
      url,
      headers,
      startTime: _startTime,
    });

    // Error Log
    Logger.error(exception.stack);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      result: false,
      code: ExceptionCode.InternalServerError,
      message: ExceptionMessage.INTERNAL_SERVER_ERROR,
    });
  }
}
