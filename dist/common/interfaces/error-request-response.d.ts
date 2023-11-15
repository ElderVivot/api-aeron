export interface IErrorRequestResponse {
    repository: string;
    method: string;
    filePath: string;
    error: string;
    statusCode: number;
}
