import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class ErrorRequestResponseFilter implements ExceptionFilter {
    catch(exception: ErrorRequestResponse, host: ArgumentsHost): void;
}
