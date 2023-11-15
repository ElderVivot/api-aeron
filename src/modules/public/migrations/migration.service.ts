import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { Injectable } from '@nestjs/common'

import { GetFilterDto } from './dto/get-filter.dto'
import { Migration } from './migration.entity'
import { MigrationRepository } from './migration.repository'

@Injectable()
export class MigrationService {
    constructor (private repository: MigrationRepository) {}

    async index (getFilter: GetFilterDto): Promise<Migration[] | ErrorRequestResponse> {
        return await this.repository.index(getFilter)
    }

    async show (id: number): Promise<Migration | ErrorRequestResponse> {
        return await this.repository.show(id)
    }
}