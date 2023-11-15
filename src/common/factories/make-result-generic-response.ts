import { IResultGenericResponse } from '../interfaces/result-generic-response'

export function MakeResultGenericResponse (message: string, statusCode: number = 400): IResultGenericResponse {
    return {
        message,
        statusCode
    }
}