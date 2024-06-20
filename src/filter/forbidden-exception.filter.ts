import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ExceptionCode, ExceptionMessage } from 'src/constant/exception';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response
      .status(
        exception.getStatus ? exception.getStatus() : HttpStatus.FORBIDDEN,
      )
      .json({
        result: false,
        code: ExceptionCode.PermissionDenied,
        message: ExceptionMessage[ExceptionCode.PermissionDenied],
      });
  }
}
