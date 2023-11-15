import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { StateRepository } from '../state/state.repository';
import { City } from './city.entity';
import { CityRepository } from './city.repository';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { GetFilterDto } from './dto/get-filter.dto';
export declare class CityService {
    private repository;
    private stateRepository;
    constructor(repository: CityRepository, stateRepository: StateRepository);
    index(getFilter: GetFilterDto): Promise<City[] | ErrorRequestResponse>;
    show(id: number): Promise<City | ErrorRequestResponse>;
    store(createOrUpdateDto: CreateOrUpdateDto): Promise<Pick<City, 'id_city'> | ErrorRequestResponse>;
    update(id: number, createOrUpdateDto: CreateOrUpdateDto): Promise<City | ErrorRequestResponse>;
    upsert(createOrUpdateDto: CreateOrUpdateDto): Promise<City | ErrorRequestResponse>;
    destroy(id: number): Promise<IDeleteResult | ErrorRequestResponse>;
}
