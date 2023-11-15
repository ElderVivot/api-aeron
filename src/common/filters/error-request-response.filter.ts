import { Request, Response } from 'express'

import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'

@Catch(ErrorRequestResponse)
export class ErrorRequestResponseFilter implements ExceptionFilter {
    catch (exception: ErrorRequestResponse, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()
        console.log(exception.stack)

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                urlRequest: request.url,
                stackError: exception.stack,
                ...exception
            })
    }
}