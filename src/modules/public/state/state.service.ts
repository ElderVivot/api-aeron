import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { Injectable } from '@nestjs/common'

import { CreateOrUpdateStateDto } from './dto/create-or-update-state.dto'
import { GetStateFilterDto } from './dto/get-state-filter.dto'
import { State } from './state.entity'
import { StateRepository } from './state.repository'

@Injectable()
export class StateService {
    constructor (private repository: StateRepository) {}

    async index (getStateFilter: GetStateFilterDto): Promise<State[] | ErrorRequestResponse> {
        return await this.repository.index(getStateFilter)
    }

    async show (id: number): Promise<State | ErrorRequestResponse> {
        return await this.repository.show(id)
    }

    async store (createOrUpdateDto: CreateOrUpdateStateDto): Promise<Pick<State, 'id_state'> | ErrorRequestResponse> {
        return await this.repository.store(createOrUpdateDto)
    }

    async destroy (id: number): Promise<IDeleteResult | ErrorRequestResponse> {
        return await this.repository.destroy(id)
    }

    async update (id: number, createOrUpdateDto: CreateOrUpdateStateDto): Promise<State | ErrorRequestResponse> {
        return await this.repository.update(id, createOrUpdateDto)
    }
}