import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { Connection } from '@database/connection';
import { FilterDto } from './dto/filter.dto';
import { UserPortalsHasAccess } from './user_portals_has_access.entity';
export declare class UserPortalsHasAccessRepository {
    private connection;
    constructor(connection: Connection);
    index(dto: FilterDto, tenant: string): Promise<UserPortalsHasAccess[] | ErrorRequestResponse>;
    show(idUserPortalsHasAccess: string, tenant: string): Promise<UserPortalsHasAccess | ErrorRequestResponse>;
    store(userPortalsHasAccess: UserPortalsHasAccess, tenant: string): Promise<Pick<UserPortalsHasAccess, 'idUserPortalsHasAccess'> | ErrorRequestResponse>;
    update(userPortalsHasAccess: UserPortalsHasAccess, tenant: string): Promise<void | ErrorRequestResponse>;
    destroy(idUserPortalsHasAccess: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse>;
}
