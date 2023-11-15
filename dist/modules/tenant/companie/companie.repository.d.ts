import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { Connection } from '@database/connection';
import { Companie } from './companie.entity';
import { FilterDto } from './dto/filter.dto';
export declare class CompanieRepository {
    private connection;
    constructor(connection: Connection);
    index(dto: FilterDto, tenant: string): Promise<Companie[] | ErrorRequestResponse>;
    indexCountWithoutFilterPage(dto: FilterDto, tenant: string): Promise<{
        count: string;
    } | ErrorRequestResponse>;
    indexOnlyIDCompanie(dto: FilterDto, tenant: string): Promise<Companie[] | ErrorRequestResponse>;
    indexOnlyIDCompanieCount(dto: FilterDto, tenant: string): Promise<{
        count: string;
    } | ErrorRequestResponse>;
    show(idCompanie: string, tenant: string): Promise<Companie | ErrorRequestResponse>;
    store(companie: Companie, tenant: string): Promise<Pick<Companie, 'idCompanie'> | ErrorRequestResponse>;
    update(companie: Companie, tenant: string): Promise<void | ErrorRequestResponse>;
    destroy(idCompanie: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse>;
}
