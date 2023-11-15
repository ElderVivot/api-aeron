import { HttpException } from '@nestjs/common'

import { IErrorRequestResponse } from '../interfaces/error-request-response'

export function MakeErrorRequestResponse (repository: string, method: string, filePath: string, error: any): IErrorRequestResponse {
    return {
        repository,
        method,
        filePath,
        error: error.response?.message || error.toString(),
        statusCode: error.response?.statusCode || 400
    }
}
export class ErrorRequestResponse extends HttpException {
    private statusCode: number
    constructor (private readonly repository: string, private readonly method: string, private readonly filePath: string, error: any) {
        super({}, error.response?.statusCode || error.message?.status || 400)
        this.message = error
        this.name = error.response?.message || error.toString()
        this.statusCode = error.response?.statusCode || error.message?.status || 400
    }
}

export function MakeErrorRequestResponseV2 (repository: string, method: string, filePath: string, error: any, dto?: any): ErrorRequestResponse {
    console.log(dto)
    throw new ErrorRequestResponse(repository, method, filePath, error)
}