import { HttpException } from '@nestjs/common';
import { IErrorRequestResponse } from '../interfaces/error-request-response';
export declare function MakeErrorRequestResponse(repository: string, method: string, filePath: string, error: any): IErrorRequestResponse;
export declare class ErrorRequestResponse extends HttpException {
    private readonly repository;
    private readonly method;
    private readonly filePath;
    private statusCode;
    constructor(repository: string, method: string, filePath: string, error: any);
}
export declare function MakeErrorRequestResponseV2(repository: string, method: string, filePath: string, error: any, dto?: any): ErrorRequestResponse;
