/// <reference types="node" />
import { Response } from 'express';
import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
import { LogNfsPrefGyn } from './log-nfs-pref-gyn.entity';
import { LogNfsPrefGynService } from './log-nfs-pref-gyn.service';
export declare class LogNfsPrefGynController {
    private service;
    constructor(service: LogNfsPrefGynService);
    index(tenant: string, dto: FilterDto, res: Response): Promise<void>;
    show(tenant: string, id: string): Promise<LogNfsPrefGyn | ErrorRequestResponse>;
    store(tenant: string, dto: CreateOrUpdateDto): Promise<Pick<LogNfsPrefGyn, 'idLogNfsPrefGyn'> | ErrorRequestResponse>;
    update(tenant: string, id: string, dto: CreateOrUpdateDto): Promise<LogNfsPrefGyn | ErrorRequestResponse>;
    uploadPrintLog(tenant: string, id: string, body: {
        bufferImage: string | Buffer;
    }): Promise<LogNfsPrefGyn | ErrorRequestResponse>;
}
