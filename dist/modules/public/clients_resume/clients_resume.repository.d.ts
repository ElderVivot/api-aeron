import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { Connection } from '@database/connection';
interface ITypeLogResult {
    success: number;
    warning: number;
    to_process: number;
    processing: number;
    error: number;
    total: number;
    lastUpdatedSuccess: Date;
}
export declare class ClientsResumeRepository {
    private connection;
    constructor(connection: Connection);
    getDataCompanies(tenant: string, competence: string): Promise<{
        qtd: any;
    } | ErrorRequestResponse>;
    getQtdRecordsInAnyTable(tenant: string, tableName: string): Promise<{
        qtd: any;
    } | ErrorRequestResponse>;
    getDataFromLogNotaFiscalGO(tenant: string, competence: string): Promise<ITypeLogResult | ErrorRequestResponse>;
    getDataFromLogNotaNFsGYN(tenant: string, competence: string): Promise<ITypeLogResult | ErrorRequestResponse>;
}
export {};
