/// <reference types="multer" />
import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { ICertInfoAdapter } from './cert-info.adapter';
import { ICertInfo, IPkcs12ReadResult } from './interfaces-cert';
export declare class CertInfoImplementation implements ICertInfoAdapter {
    private readonly file;
    private readonly password;
    private certInfo;
    constructor(file: Express.Multer.File, password: string);
    private getIfECpfCnpj;
    private getNameCertAndFederalRegistration;
    readPkcs12(): Promise<IPkcs12ReadResult | ErrorRequestResponse>;
    readCertificateInfo(): Promise<ICertInfo | ErrorRequestResponse>;
}
