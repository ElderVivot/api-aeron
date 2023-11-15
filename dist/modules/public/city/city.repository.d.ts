import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { Connection } from '@database/connection';
import { State } from '../state/state.entity';
import { StateRepository } from '../state/state.repository';
import { City } from './city.entity';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { GetFilterDto } from './dto/get-filter.dto';
export declare class CityRepository {
    private connection;
    private stateRepository;
    constructor(connection: Connection, stateRepository: StateRepository);
    index(getFilter: GetFilterDto): Promise<City[] | ErrorRequestResponse>;
    show(idCity: number): Promise<City | ErrorRequestResponse>;
    store(createOrUpdateDto: CreateOrUpdateDto, state: State): Promise<Pick<City, 'id_city'> | ErrorRequestResponse>;
    update(idCity: number, createOrUpdateDto: CreateOrUpdateDto, state: State): Promise<City | ErrorRequestResponse>;
    destroy(idCity: number): Promise<IDeleteResult | ErrorRequestResponse>;
}
