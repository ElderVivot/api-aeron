import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { Connection } from '@database/connection';
import { AccessPortals } from './access_portals.entity';
import { FilterDto } from './dto/filter.dto';
export declare class AccessPortalsRepository {
    private connection;
    constructor(connection: Connection);
    index(dto: FilterDto, tenant: string): Promise<AccessPortals[] | ErrorRequestResponse>;
    indexCountWithoutFilterPage(dto: FilterDto, tenant: string): Promise<{
        count: string;
    } | ErrorRequestResponse>;
    show(idAccessPortals: string, tenant: string): Promise<AccessPortals | ErrorRequestResponse>;
    store(accessPortals: AccessPortals, tenant: string): Promise<Pick<AccessPortals, 'idAccessPortals'> | ErrorRequestResponse>;
    update(accessPortals: AccessPortals, tenant: string): Promise<void | ErrorRequestResponse>;
    updateDataAboutPasswordIncorrect(idAccessPortals: string, tenant: string, timestampPasswordIncorrect: Date): Promise<void | ErrorRequestResponse>;
    destroy(idAccessPortals: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse>;
}
