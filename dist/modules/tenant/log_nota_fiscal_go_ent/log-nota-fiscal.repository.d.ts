import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { Connection } from '@database/connection';
import { Companie } from '../companie/companie.entity';
import { FilterDto } from './dto/filter.dto';
import { LogNotaFiscal } from './log-nota-fiscal.entity';
export declare class LogNotaFiscalRepository {
    private connection;
    constructor(connection: Connection);
    index(dto: FilterDto, tenant: string): Promise<LogNotaFiscal[] | ErrorRequestResponse>;
    indexToFront(dto: FilterDto, tenant: string): Promise<LogNotaFiscal[] | ErrorRequestResponse>;
    indexToFrontCountWithoutFilterPage(dto: FilterDto, tenant: string): Promise<{
        count: string;
    } | ErrorRequestResponse>;
    show(idLogNotaFiscal: string, tenant: string): Promise<LogNotaFiscal | ErrorRequestResponse>;
    store(logNotaFiscal: LogNotaFiscal, tenant: string): Promise<Pick<LogNotaFiscal, 'idLogNotaFiscal'> | ErrorRequestResponse>;
    update(logNotaFiscal: LogNotaFiscal, tenant: string): Promise<void | ErrorRequestResponse>;
    getCompaniesThatDontProcessNotaFiscalYet(dto: FilterDto, tenant: string): Promise<Companie[] | ErrorRequestResponse>;
}
