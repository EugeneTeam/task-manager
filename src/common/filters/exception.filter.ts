import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.isCustomError) {
      return response.status(exception.status).json({
        success: false,
        error: {
          message: exception.message,
          code: exception.code,
        },
        data: null,
      });
    } else {
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal server error';

      response.status(status).json({
        success: false,
        error: {
          message,
          code: 'UnknownErrorCode',
        },
        data: null,
      });
    }
  }
}
