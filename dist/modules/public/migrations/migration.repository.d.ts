import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { Connection } from '@database/connection';
import { GetFilterDto } from './dto/get-filter.dto';
import { Migration } from './migration.entity';
export declare class MigrationRepository {
    private connection;
    constructor(connection: Connection);
    index(getFilter: GetFilterDto, errorIfDontFindAnything?: boolean): Promise<Migration[] | ErrorRequestResponse>;
    show(idMigrationExecuted: number): Promise<Migration | ErrorRequestResponse>;
}
