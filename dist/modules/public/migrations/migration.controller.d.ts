import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { GetFilterDto } from './dto/get-filter.dto';
import { Migration } from './migration.entity';
import { MigrationService } from './migration.service';
export declare class MigrationController {
    private service;
    constructor(service: MigrationService);
    index(filterDto: GetFilterDto): Promise<Migration[] | ErrorRequestResponse>;
    show(id: number): Promise<Migration | ErrorRequestResponse>;
}
