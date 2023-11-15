import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { Connection } from '@database/connection';
import { FilterDto } from './dto/filter.dto';
import { LogNfsPrefGyn } from './log-nfs-pref-gyn.entity';
export declare class LogNfsPrefGynRepository {
    private connection;
    constructor(connection: Connection);
    index(dto: FilterDto, tenant: string): Promise<LogNfsPrefGyn[] | ErrorRequestResponse>;
    indexCountWithoutFilterPage(dto: FilterDto, tenant: string): Promise<{
        count: string;
    } | ErrorRequestResponse>;
    show(idLogNfsPrefGyn: string, tenant: string): Promise<LogNfsPrefGyn | ErrorRequestResponse>;
    store(logNotaFiscal: LogNfsPrefGyn, tenant: string): Promise<Pick<LogNfsPrefGyn, 'idLogNfsPrefGyn'> | ErrorRequestResponse>;
    update(logNotaFiscal: LogNfsPrefGyn, tenant: string): Promise<void | ErrorRequestResponse>;
    updateUrlPrintLog(idLogNfsPrefGyn: string, urlPrintLog: string, tenant: string): Promise<void | ErrorRequestResponse>;
}
