import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
import { QueroConhecer } from './quero_conhecer.entity';
import { QueroConhecerService } from './quero_conhecer.service';
export declare class QueroConhecerController {
    private service;
    constructor(service: QueroConhecerService);
    index(filterDto: FilterDto): Promise<QueroConhecer[] | ErrorRequestResponse>;
    show(id: string): Promise<QueroConhecer | ErrorRequestResponse>;
    store(dto: CreateOrUpdateDto): Promise<QueroConhecer | ErrorRequestResponse>;
}
