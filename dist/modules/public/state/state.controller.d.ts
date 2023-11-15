import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { CreateOrUpdateStateDto } from './dto/create-or-update-state.dto';
import { GetStateFilterDto } from './dto/get-state-filter.dto';
import { State } from './state.entity';
import { StateService } from './state.service';
export declare class StateController {
    private service;
    constructor(service: StateService);
    index(filterDto: GetStateFilterDto): Promise<State[] | ErrorRequestResponse>;
    show(id: number): Promise<State | ErrorRequestResponse>;
    store(createOrUpdateDto: CreateOrUpdateStateDto): Promise<Pick<State, 'id_state'> | ErrorRequestResponse>;
    destroy(id: number): Promise<IDeleteResult | ErrorRequestResponse>;
    update(id: number, createOrUpdateDto: CreateOrUpdateStateDto): Promise<State | ErrorRequestResponse>;
}
