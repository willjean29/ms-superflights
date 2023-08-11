import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isInstanceOfHttpException = exception instanceof HttpException;
    const status =
      isInstanceOfHttpException
        ? exception.getStatus()
        : exception.status ? exception.status : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg =
      isInstanceOfHttpException ? exception.getResponse() : exception.response ? exception.response : exception;

    this.logger.error(`Status ${status} Error: ${JSON.stringify(msg)}`);

    response.status(status).json({
      time: new Date().toISOString(),
      path: request.path,
      error: msg,
    });
  }
}
