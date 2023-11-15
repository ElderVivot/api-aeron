import { MakeErrorRequestResponseV2, ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { Connection } from '@database/connection'
import { NotFoundException, Inject } from '@nestjs/common'

import { GetFilterDto } from './dto/get-filter.dto'
import { Migration } from './migration.entity'

export class MigrationRepository {
    constructor (
        @Inject('CONNECTION') private connection: Connection
    ) {}

    async index (getFilter: GetFilterDto, errorIfDontFindAnything = false): Promise<Migration[] | ErrorRequestResponse> {
        const { schema, name, typeResult, createdAt } = getFilter
        try {
            let sql = `
                SELECT *
                FROM public.migrations_executed
                WHERE "idMigrationExecuted" IS NOT NULL
            `
            if (schema) sql = sql + '\nAND "schema" = $<schema>'
            if (name) sql = sql + 'AND "name" LIKE \'%\' || $<name> || \'%\''
            if (typeResult) sql = sql + 'AND "typeResult" = $<typeResult>'
            if (createdAt) sql = sql + 'AND DATE("createdAt") = DATE($<createdAt>)'

            const result = await this.connection.query(sql, { schema, name, typeResult, createdAt })

            if (errorIfDontFindAnything && (!result || result.length === 0)) {
                throw new NotFoundException(`Migration with filter ${getFilter} not found`)
            }
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.migration', 'index', __filename, error)
        }
    }

    async show (idMigrationExecuted: number): Promise<Migration | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT *
                FROM public.migrations_executed
                WHERE "idMigrationExecuted" = $<idMigrationExecuted>
            `
            const result = await this.connection.query(sql, { idMigrationExecuted })
            if (!result || result.length === 0) {
                throw new NotFoundException(`Migration with ID ${idMigrationExecuted} not found`)
            }
            return result[0]
        } catch (error) {
            return MakeErrorRequestResponseV2('public.migration', 'show', __filename, error)
        }
    }
}