import { HttpException, HttpStatus } from '@nestjs/common';
import {
  CodeToStatus,
  ExceptionCode,
  ExceptionMessage,
} from 'src/constant/exception';

export class HttpError extends HttpException {
  code: string;

  constructor(status: number, code?: string, message?: string) {
    super(message || ExceptionMessage[code] || 'error', status);
    this.code = code || 'UNDEFINED_CODE';
  }
}

export class ServiceError extends Error {
  code: ExceptionCode;

  constructor(code?: ExceptionCode, err?: Error) {
    super();
    this.code = code || ExceptionCode.InternalServerError;

    if (err) {
      this.name = err.name;
      this.message = err.message;
      this.stack = err.stack;
    }
  }

  getStatus(): HttpStatus {
    return CodeToStatus[this.code];
  }
}
export class OkbError extends Error {
  code: string;
  message: string;

  constructor(code: string, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}
