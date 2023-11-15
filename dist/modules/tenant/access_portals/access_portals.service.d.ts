import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { AccessPortals } from './access_portals.entity';
import { AccessPortalsRepository } from './access_portals.repository';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
export declare class AccessPortalsService {
    private repository;
    private cryptImplementation;
    constructor(repository: AccessPortalsRepository);
    index(dto: FilterDto, tenant: string): Promise<{
        data: AccessPortals[];
        count: string;
    } | ErrorRequestResponse>;
    show(idAccessPortals: string, tenant: string): Promise<AccessPortals | ErrorRequestResponse>;
    showWithDecryptPassword(idAccessPortals: string, tenant: string): Promise<AccessPortals | ErrorRequestResponse>;
    store(dto: CreateOrUpdateDto, tenant: string): Promise<Pick<AccessPortals, 'idAccessPortals'> | ErrorRequestResponse>;
    destroy(idAccessPortals: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse>;
    update(idAccessPortals: string, dto: CreateOrUpdateDto, tenant: string): Promise<AccessPortals | ErrorRequestResponse>;
    updateDataAboutPasswordIncorrect(idAccessPortals: string, tenant: string): Promise<AccessPortals | ErrorRequestResponse>;
}
