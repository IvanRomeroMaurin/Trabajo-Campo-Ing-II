import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { 
  CategoryNotFoundError, 
  CategoryAlreadyExistsError,
  CategoryAlreadyActiveError 
} from '../../modules/categories/domain/exceptions/category.exceptions';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    // Mapeo selectivo de Errores de Dominio a Status Codes
    if (exception instanceof CategoryNotFoundError) {
      status = HttpStatus.NOT_FOUND;
    } else if (
      exception instanceof CategoryAlreadyExistsError || 
      exception instanceof CategoryAlreadyActiveError
    ) {
      status = HttpStatus.BAD_REQUEST;
    }

    // Si no es un error de dominio conocido, dejamos que Nest o el programador manejen el 500
    // Opcional: si es una HttpException normal de Nest, la dejamos pasar.
    if ((exception as any).getStatus) {
      return response
        .status((exception as any).getStatus())
        .json((exception as any).getResponse());
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
