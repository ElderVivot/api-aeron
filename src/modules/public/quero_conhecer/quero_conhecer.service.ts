import { MakeErrorRequestResponseV2, ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { Injectable } from '@nestjs/common'

import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'
import { QueroConhecer } from './quero_conhecer.entity'
import { QueroConhecerRepository } from './quero_conhecer.repository'

@Injectable()
export class QueroConhecerService {
    constructor (
        private repository: QueroConhecerRepository
    ) {}

    async index (filter: FilterDto): Promise<QueroConhecer[] | ErrorRequestResponse> {
        try {
            return await this.repository.index(filter)
        } catch (error) {
            return MakeErrorRequestResponseV2('public.quero_conhecer', 'index', __filename, error)
        }
    }

    async show (idQueroConhecer: string): Promise<QueroConhecer | ErrorRequestResponse> {
        return await this.repository.show(idQueroConhecer)
    }

    async store (dto: CreateOrUpdateDto): Promise<QueroConhecer | ErrorRequestResponse> {
        try {
            let data = new QueroConhecer()
            data.createdAt = new Date()
            data = Object.assign(data, dto)
            data.alreadyContactedTheCustomer = '0'

            return await this.repository.store(data)
        } catch (error) {
            return MakeErrorRequestResponseV2('public.quero_conhecer', 'store', __filename, error)
        }
    }
}