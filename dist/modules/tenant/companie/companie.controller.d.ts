import { Response } from 'express';
import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { Companie } from './companie.entity';
import { CompanieService } from './companie.service';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
export declare class CompanieController {
    private service;
    constructor(service: CompanieService);
    index(tenant: string, dto: FilterDto, res: Response): Promise<void>;
    indexOnlyIDCompanie(tenant: string, dto: FilterDto, res: Response): Promise<void>;
    show(tenant: string, id: string): Promise<Companie | ErrorRequestResponse>;
    store(tenant: string, dto: CreateOrUpdateDto): Promise<Pick<Companie, 'idCompanie'> | ErrorRequestResponse>;
    destroy(tenant: string, id: string): Promise<IDeleteResult | ErrorRequestResponse>;
    update(tenant: string, id: string, dto: CreateOrUpdateDto): Promise<Companie | ErrorRequestResponse>;
}
