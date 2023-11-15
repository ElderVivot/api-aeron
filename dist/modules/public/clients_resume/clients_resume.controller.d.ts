import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { ClientsResume, ClientsResumeShowQtdRecordsAnyTable } from './clients_resume.entity';
import { ClientsResumeService } from './clients_resume.service';
import { FilterDto } from './dto/filter.dto';
export declare class ClientsResumeController {
    private service;
    constructor(service: ClientsResumeService);
    index(filterDto: FilterDto): Promise<ClientsResume[] | ErrorRequestResponse>;
    indexQtdRecordsInAnyTable(tableName: string): Promise<ClientsResumeShowQtdRecordsAnyTable[] | ErrorRequestResponse>;
}
