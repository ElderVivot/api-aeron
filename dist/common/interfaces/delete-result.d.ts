export interface IDeleteResult {
    repository: string;
    id: string;
    type: 'error' | 'success';
    message: string;
}
