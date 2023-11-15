import { Response } from 'express';
import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { Companie } from '../companie/companie.entity';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
import { LogNotaFiscal } from './log-nota-fiscal.entity';
import { LogNotaFiscalService } from './log-nota-fiscal.service';
export declare class LogNotaFiscalController {
    private service;
    constructor(service: LogNotaFiscalService);
    index(tenant: string, dto: FilterDto): Promise<LogNotaFiscal[] | ErrorRequestResponse>;
    indexToFront(tenant: string, dto: FilterDto, res: Response): Promise<void>;
    getCompaniesThatDontProcessNotaFiscalYet(tenant: string, dto: FilterDto): Promise<Companie[] | ErrorRequestResponse>;
    show(tenant: string, id: string): Promise<LogNotaFiscal | ErrorRequestResponse>;
    store(tenant: string, dto: CreateOrUpdateDto): Promise<Pick<LogNotaFiscal, 'idLogNotaFiscal'> | ErrorRequestResponse>;
    update(tenant: string, id: string, dto: CreateOrUpdateDto): Promise<LogNotaFiscal | ErrorRequestResponse>;
}
