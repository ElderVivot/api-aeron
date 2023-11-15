import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { GetFilterDto } from './dto/get-filter.dto';
import { Migration } from './migration.entity';
import { MigrationRepository } from './migration.repository';
export declare class MigrationService {
    private repository;
    constructor(repository: MigrationRepository);
    index(getFilter: GetFilterDto): Promise<Migration[] | ErrorRequestResponse>;
    show(id: number): Promise<Migration | ErrorRequestResponse>;
}
