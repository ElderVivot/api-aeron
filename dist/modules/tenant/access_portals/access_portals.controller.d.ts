import { Response } from 'express';
import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { AccessPortals } from './access_portals.entity';
import { AccessPortalsService } from './access_portals.service';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
export declare class AccessPortalsController {
    private service;
    constructor(service: AccessPortalsService);
    index(tenant: string, dto: FilterDto, res: Response): Promise<void>;
    show(tenant: string, id: string): Promise<AccessPortals | ErrorRequestResponse>;
    showWithDecryptPassword(tenant: string, id: string): Promise<AccessPortals | ErrorRequestResponse>;
    store(tenant: string, dto: CreateOrUpdateDto): Promise<Pick<AccessPortals, 'idAccessPortals'> | ErrorRequestResponse>;
    destroy(tenant: string, id: string): Promise<IDeleteResult | ErrorRequestResponse>;
    update(tenant: string, id: string, dto: CreateOrUpdateDto): Promise<AccessPortals | ErrorRequestResponse>;
    updateDataAboutPasswordIncorrect(tenant: string, id: string): Promise<AccessPortals | ErrorRequestResponse>;
}
