import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
import { UserPortalsHasAccess } from './user_portals_has_access.entity';
import { UserPortalsHasAccessService } from './user_portals_has_access.service';
export declare class UserPortalsHasAccessController {
    private service;
    constructor(service: UserPortalsHasAccessService);
    index(tenant: string, dto: FilterDto): Promise<UserPortalsHasAccess[] | ErrorRequestResponse>;
    show(tenant: string, id: string): Promise<UserPortalsHasAccess | ErrorRequestResponse>;
    store(tenant: string, dto: CreateOrUpdateDto): Promise<Pick<UserPortalsHasAccess, 'idUserPortalsHasAccess'> | ErrorRequestResponse>;
    destroy(tenant: string, id: string): Promise<IDeleteResult | ErrorRequestResponse>;
    update(tenant: string, id: string, dto: CreateOrUpdateDto): Promise<UserPortalsHasAccess | ErrorRequestResponse>;
}
