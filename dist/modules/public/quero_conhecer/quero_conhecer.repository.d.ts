import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { Connection } from '@database/connection';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
import { QueroConhecer } from './quero_conhecer.entity';
export declare class QueroConhecerRepository {
    private connection;
    constructor(connection: Connection);
    index(filterDto: FilterDto): Promise<QueroConhecer[] | ErrorRequestResponse>;
    show(idQueroConhecer: string): Promise<QueroConhecer | ErrorRequestResponse>;
    store(dto: CreateOrUpdateDto): Promise<QueroConhecer | ErrorRequestResponse>;
}
