import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
import { QueroConhecer } from './quero_conhecer.entity';
import { QueroConhecerRepository } from './quero_conhecer.repository';
export declare class QueroConhecerService {
    private repository;
    constructor(repository: QueroConhecerRepository);
    index(filter: FilterDto): Promise<QueroConhecer[] | ErrorRequestResponse>;
    show(idQueroConhecer: string): Promise<QueroConhecer | ErrorRequestResponse>;
    store(dto: CreateOrUpdateDto): Promise<QueroConhecer | ErrorRequestResponse>;
}
