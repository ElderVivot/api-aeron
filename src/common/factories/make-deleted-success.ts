import { IDeleteResult } from '../interfaces/delete-result'

export function MakeDeleteResult (repository: string, id: any): IDeleteResult {
    return {
        repository,
        id,
        type: 'success',
        message: 'Deleted with success'
    }
}