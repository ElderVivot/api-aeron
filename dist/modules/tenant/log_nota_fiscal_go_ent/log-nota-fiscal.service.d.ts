import { AwsS3 } from '@common/aws/s3/s3';
import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { CompanieRepository } from '@modules/tenant/companie/companie.repository';
import { Companie } from '../companie/companie.entity';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
import { LogNotaFiscal } from './log-nota-fiscal.entity';
import { LogNotaFiscalRepository } from './log-nota-fiscal.repository';
export declare class LogNotaFiscalService {
    private awsS3;
    private repository;
    private companieRepository;
    constructor(awsS3: AwsS3, repository: LogNotaFiscalRepository, companieRepository: CompanieRepository);
    private getIdCompanie;
    index(dto: FilterDto, tenant: string): Promise<LogNotaFiscal[] | ErrorRequestResponse>;
    indexToFront(dto: FilterDto, tenant: string): Promise<{
        data: LogNotaFiscal[];
        count: string;
    } | ErrorRequestResponse>;
    show(idLogNotaFiscal: string, tenant: string): Promise<LogNotaFiscal | ErrorRequestResponse>;
    store(dto: CreateOrUpdateDto, tenant: string): Promise<Pick<LogNotaFiscal, 'idLogNotaFiscal'> | ErrorRequestResponse>;
    update(idLogNotaFiscal: string, dto: CreateOrUpdateDto, tenant: string): Promise<LogNotaFiscal | ErrorRequestResponse>;
    getCompaniesThatDontProcessNotaFiscalYet(dto: FilterDto, tenant: string): Promise<Companie[] | ErrorRequestResponse>;
}
