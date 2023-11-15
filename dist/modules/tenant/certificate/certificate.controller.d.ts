/// <reference types="multer" />
import { Response } from 'express';
import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { Certificate } from './certificate.entity';
import { CertificateService } from './certificate.service';
import { FilterDto } from './dto/filter.dto';
export declare class CertificateController {
    private service;
    constructor(service: CertificateService);
    index(tenant: string, dto: FilterDto): Promise<Certificate[] | ErrorRequestResponse>;
    getListCertificateNotOverdue(tenant: string, dto: FilterDto): Promise<string[] | ErrorRequestResponse>;
    indexToFront(tenant: string, dto: FilterDto, res: Response): Promise<void>;
    show(tenant: string, id: string): Promise<Certificate | ErrorRequestResponse>;
    showWithDecryptPassword(tenant: string, id: string): Promise<Certificate | ErrorRequestResponse>;
    store(tenant: string, password: string, file: Express.Multer.File): Promise<Pick<Certificate, 'idCertificate'> | ErrorRequestResponse>;
    destroy(tenant: string, id: string): Promise<IDeleteResult | ErrorRequestResponse>;
    update(tenant: string, id: string, password: string, file: Express.Multer.File): Promise<Certificate | ErrorRequestResponse>;
}
