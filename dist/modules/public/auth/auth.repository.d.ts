import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { Connection } from '@database/connection';
import { IClientsUserHaveAccess } from './interfaces/user';
export declare class AuthRepository {
    private connection;
    constructor(connection: Connection);
    showClientsUserHaveAccess(username: string): Promise<IClientsUserHaveAccess[] | ErrorRequestResponse>;
}
