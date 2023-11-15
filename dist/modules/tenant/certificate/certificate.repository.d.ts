import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { Connection } from '@database/connection';
import { Certificate } from './certificate.entity';
import { FilterDto } from './dto/filter.dto';
export declare class CertificateRepository {
    private connection;
    constructor(connection: Connection);
    index(dto: FilterDto, tenant: string): Promise<Certificate[] | ErrorRequestResponse>;
    getListCertificateNotOverdue(dto: FilterDto, tenant: string): Promise<{
        federalRegistration: string;
    }[] | ErrorRequestResponse>;
    indexToFront(dto: FilterDto, tenant: string): Promise<Certificate[] | ErrorRequestResponse>;
    indexToFrontWithoutFilterPage(dto: FilterDto, tenant: string): Promise<{
        count: string;
    } | ErrorRequestResponse>;
    show(idCertificate: string, tenant: string): Promise<Certificate | ErrorRequestResponse>;
    store(certificate: Certificate, tenant: string): Promise<Pick<Certificate, 'idCertificate'> | ErrorRequestResponse>;
    update(certificate: Certificate, tenant: string): Promise<void | ErrorRequestResponse>;
    destroy(idCertificate: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse>;
}
