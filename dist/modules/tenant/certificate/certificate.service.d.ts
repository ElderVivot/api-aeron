import { AwsS3 } from '@common/aws/s3/s3';
import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { Certificate } from './certificate.entity';
import { CertificateRepository } from './certificate.repository';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
export declare class CertificateService {
    private awsS3;
    private repository;
    private dateImplementation;
    private cryptImplementation;
    private certInfoImplementation;
    constructor(awsS3: AwsS3, repository: CertificateRepository);
    private readCertificateInfo;
    private loadFieldsCertificate;
    index(dto: FilterDto, tenant: string): Promise<Certificate[] | ErrorRequestResponse>;
    getListCertificateNotOverdue(dto: FilterDto, tenant: string): Promise<string[] | ErrorRequestResponse>;
    indexToFront(dto: FilterDto, tenant: string): Promise<{
        data: Certificate[];
        count: string;
    } | ErrorRequestResponse>;
    show(idCertificate: string, tenant: string): Promise<Certificate | ErrorRequestResponse>;
    showWithDecryptPassword(idCertificate: string, tenant: string): Promise<Certificate | ErrorRequestResponse>;
    store(dto: CreateOrUpdateDto, tenant: string): Promise<Pick<Certificate, 'idCertificate'> | ErrorRequestResponse>;
    destroy(idCertificate: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse>;
    update(idCertificate: string, dto: CreateOrUpdateDto, tenant: string): Promise<Certificate | ErrorRequestResponse>;
}
