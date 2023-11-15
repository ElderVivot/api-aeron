import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { Connection } from '@database/connection';
import { CreateOrUpdateStateDto } from './dto/create-or-update-state.dto';
import { GetStateFilterDto } from './dto/get-state-filter.dto';
import { State } from './state.entity';
export declare class StateRepository {
    private connection;
    constructor(connection: Connection);
    index(getStateFilter: GetStateFilterDto, errorIfDontFindAnything?: boolean): Promise<State[] | ErrorRequestResponse>;
    show(idState: number): Promise<State | ErrorRequestResponse>;
    store(createOrUpdateDto: CreateOrUpdateStateDto): Promise<Pick<State, 'id_state'> | ErrorRequestResponse>;
    destroy(idState: number): Promise<IDeleteResult | ErrorRequestResponse>;
    update(idState: number, createOrUpdateDto: CreateOrUpdateStateDto): Promise<State | ErrorRequestResponse>;
}
