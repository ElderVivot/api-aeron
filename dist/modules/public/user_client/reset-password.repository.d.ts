import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IResultGenericResponse } from '@common/interfaces/result-generic-response';
import { Connection } from '@database/connection';
import { ResetPassword } from './reset-password.entity';
export declare class ResetPasswordRepository {
    private connection;
    constructor(connection: Connection);
    showResetPasswordNotUsed(idResetPassword: string): Promise<ResetPassword | ErrorRequestResponse>;
    sendInformationToResetPassword(userResetPassword: ResetPassword): Promise<Pick<ResetPassword, 'idResetPassword'> | ErrorRequestResponse>;
    resetPassword(idResetPassword: string): Promise<IResultGenericResponse | ErrorRequestResponse>;
}
