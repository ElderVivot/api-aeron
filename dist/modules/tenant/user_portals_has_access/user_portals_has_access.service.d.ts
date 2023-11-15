import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
import { UserPortalsHasAccess } from './user_portals_has_access.entity';
import { UserPortalsHasAccessRepository } from './user_portals_has_access.repository';
export declare class UserPortalsHasAccessService {
    private repository;
    constructor(repository: UserPortalsHasAccessRepository);
    private getIdUserPortalsHasAccess;
    index(dto: FilterDto, tenant: string): Promise<UserPortalsHasAccess[] | ErrorRequestResponse>;
    show(idUserPortalsHasAccess: string, tenant: string): Promise<UserPortalsHasAccess | ErrorRequestResponse>;
    store(dto: CreateOrUpdateDto, tenant: string): Promise<Pick<UserPortalsHasAccess, 'idUserPortalsHasAccess'> | ErrorRequestResponse>;
    destroy(idUserPortalsHasAccess: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse>;
    update(idUserPortalsHasAccess: string, dto: CreateOrUpdateDto, tenant: string): Promise<UserPortalsHasAccess | ErrorRequestResponse>;
}
