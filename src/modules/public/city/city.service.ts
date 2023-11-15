
import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { Injectable } from '@nestjs/common'

import { StateRepository } from '../state/state.repository'
import { City } from './city.entity'
import { CityRepository } from './city.repository'
import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { GetFilterDto } from './dto/get-filter.dto'

@Injectable()
export class CityService {
    constructor (
        private repository: CityRepository,
        private stateRepository: StateRepository
    ) { }

    async index (getFilter: GetFilterDto): Promise<City[] | ErrorRequestResponse> {
        return await this.repository.index({ ...getFilter })
    }

    async show (id: number): Promise<City | ErrorRequestResponse> {
        return await this.repository.show(id)
    }

    async store (createOrUpdateDto: CreateOrUpdateDto): Promise<Pick<City, 'id_city'> | ErrorRequestResponse> {
        const { acronymState } = createOrUpdateDto
        try {
            const states = await this.stateRepository.index({ acronym: acronymState })
            if (states instanceof ErrorRequestResponse) throw states
            const state = states[0]

            return await this.repository.store(createOrUpdateDto, state)
        } catch (error) {
            return MakeErrorRequestResponseV2('public.city', 'store', __filename, error)
        }
    }

    async update (id: number, createOrUpdateDto: CreateOrUpdateDto): Promise<City | ErrorRequestResponse> {
        const { acronymState } = createOrUpdateDto
        try {
            const states = await this.stateRepository.index({ acronym: acronymState })
            if (states instanceof ErrorRequestResponse) throw states
            const state = states[0]

            const show = await this.show(id)
            if (show instanceof ErrorRequestResponse) throw show

            const city = await this.repository.update(id, createOrUpdateDto, state)
            return city
        } catch (error) {
            return MakeErrorRequestResponseV2('public.city', 'update', __filename, error)
        }
    }

    async upsert (createOrUpdateDto: CreateOrUpdateDto): Promise<City | ErrorRequestResponse> {
        const { name, idIbge, acronymState } = createOrUpdateDto
        try {
            const cityExist = await this.index({ idIbge })
            if (!(cityExist instanceof ErrorRequestResponse) && cityExist.length > 0) {
                return await this.update(cityExist[0].id_city, { name, idIbge, acronymState })
            } else {
                const store = await this.store({ name, idIbge, acronymState })
                if (!(store instanceof ErrorRequestResponse)) return await this.show(store.id_city)
            }
        } catch (error) {
            return MakeErrorRequestResponseV2('public.city', 'upsert', __filename, error)
        }
    }

    async destroy (id: number): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const show = await this.show(id)
            if (show instanceof ErrorRequestResponse) throw show

            const result = await this.repository.destroy(id)
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.city', 'destroy', __filename, error)
        }
    }
}