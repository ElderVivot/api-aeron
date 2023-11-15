import { MakeDeleteResult } from '@common/factories/make-deleted-success'
import { MakeErrorRequestResponseV2, ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { Connection } from '@database/connection'
import { NotFoundException, Inject } from '@nestjs/common'

import { CreateOrUpdateStateDto } from './dto/create-or-update-state.dto'
import { GetStateFilterDto } from './dto/get-state-filter.dto'
import { State } from './state.entity'

export class StateRepository {
    constructor (
        @Inject('CONNECTION') private connection: Connection
    ) {}

    async index (getStateFilter: GetStateFilterDto, errorIfDontFindAnything = false): Promise<State[] | ErrorRequestResponse> {
        const { name, acronym } = getStateFilter
        try {
            let sql = `
                SELECT *
                FROM public.state
                WHERE "id_state" IS NOT NULL
            `
            if (name) sql = sql + 'AND "name" LIKE \'%\' || $<name> || \'%\''
            if (acronym) sql = sql + '\nAND "acronym" = $<acronym>'
            const result = await this.connection.query(sql, { name, acronym })

            if (errorIfDontFindAnything && (!result || result.length === 0)) {
                throw new NotFoundException(`State with filter ${getStateFilter} not found`)
            }
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.state', 'index', __filename, error)
        }
    }

    async show (idState: number): Promise<State | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT *
                FROM public.state
                WHERE "id_state" = $<idState>
            `
            const result = await this.connection.query(sql, { idState })
            if (!result || result.length === 0) {
                throw new NotFoundException(`State with ID ${idState} not found`)
            }
            return result[0]
        } catch (error) {
            return MakeErrorRequestResponseV2('public.state', 'show', __filename, error)
        }
    }

    async store (createOrUpdateDto: CreateOrUpdateStateDto): Promise<Pick<State, 'id_state'> | ErrorRequestResponse> {
        const { name, acronym } = createOrUpdateDto
        try {
            const sql = `
                INSERT INTO public.state(name, acronym)
                VALUES ($<name>, $<acronym>)
                RETURNING id_state
            `
            const result = await this.connection.one(sql, { name, acronym })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.state', 'store', __filename, error)
        }
    }

    async destroy (idState: number): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const show = await this.show(idState)
            if (show instanceof ErrorRequestResponse) throw show

            const sql = `
                DELETE
                FROM public.state
                WHERE "id_state" = $<idState>
            `
            const result = await this.connection.result(sql, { idState })
            if (result.rowCount) {
                return MakeDeleteResult('public.state', idState)
            }
        } catch (error) {
            return MakeErrorRequestResponseV2('public.state', 'destroy', __filename, error)
        }
    }

    async update (idState: number, createOrUpdateDto: CreateOrUpdateStateDto): Promise<State | ErrorRequestResponse> {
        try {
            const show = await this.show(idState)
            if (show instanceof ErrorRequestResponse) throw show

            const { name, acronym } = createOrUpdateDto
            const sql = `
                UPDATE public.state
                SET name = $<name>, acronym = $<acronym>
                WHERE id_state = $<idState>
            `
            const result = await this.connection.result(sql, { idState, name, acronym })
            if (result.rowCount) {
                return this.show(idState)
            }
        } catch (error) {
            return MakeErrorRequestResponseV2('public.state', 'update', __filename, error)
        }
    }
}