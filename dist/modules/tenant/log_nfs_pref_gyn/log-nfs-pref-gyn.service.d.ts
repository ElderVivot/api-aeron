/// <reference types="node" />
import { AwsS3 } from '@common/aws/s3/s3';
import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { CompanieRepository } from '@modules/tenant/companie/companie.repository';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
import { LogNfsPrefGyn } from './log-nfs-pref-gyn.entity';
import { LogNfsPrefGynRepository } from './log-nfs-pref-gyn.repository';
export declare class LogNfsPrefGynService {
    private awsS3;
    private repository;
    private companieRepository;
    constructor(awsS3: AwsS3, repository: LogNfsPrefGynRepository, companieRepository: CompanieRepository);
    private getIdCompanie;
    index(dto: FilterDto, tenant: string): Promise<{
        data: LogNfsPrefGyn[];
        count: string;
    } | ErrorRequestResponse>;
    show(idLogNfsPrefGyn: string, tenant: string): Promise<LogNfsPrefGyn | ErrorRequestResponse>;
    store(dto: CreateOrUpdateDto, tenant: string): Promise<Pick<LogNfsPrefGyn, 'idLogNfsPrefGyn'> | ErrorRequestResponse>;
    update(idLogNfsPrefGyn: string, dto: CreateOrUpdateDto, tenant: string): Promise<LogNfsPrefGyn | ErrorRequestResponse>;
    uploadPrintLog(idLogNfsPrefGyn: string, bufferImage: string | Buffer, tenant: string): Promise<LogNfsPrefGyn | ErrorRequestResponse>;
}
