import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { ClientRepository } from '../client/client.repository';
import { ClientsResume, ClientsResumeShowQtdRecordsAnyTable } from './clients_resume.entity';
import { ClientsResumeRepository } from './clients_resume.repository';
import { FilterDto } from './dto/filter.dto';
export declare class ClientsResumeService {
    private repository;
    private clientRepository;
    private dateImplementation;
    constructor(repository: ClientsResumeRepository, clientRepository: ClientRepository);
    index(filter: FilterDto): Promise<ClientsResume[] | ErrorRequestResponse>;
    indexQtdRecordsInAnyTable(tableName: string): Promise<ClientsResumeShowQtdRecordsAnyTable[] | ErrorRequestResponse>;
}
