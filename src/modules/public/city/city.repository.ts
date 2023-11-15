import { MakeDeleteResult } from '@common/factories/make-deleted-success'
import { MakeErrorRequestResponseV2, ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { Connection } from '@database/connection'
import { NotFoundException, Inject } from '@nestjs/common'

import { State } from '../state/state.entity'
import { StateRepository } from '../state/state.repository'
import { City } from './city.entity'
import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { GetFilterDto } from './dto/get-filter.dto'

export class CityRepository {
    constructor (
        @Inject('CONNECTION') private connection: Connection,
        private stateRepository: StateRepository
    ) {}

    async index (getFilter: GetFilterDto): Promise<City[] | ErrorRequestResponse> {
        const { name, acronymState, idIbge } = getFilter
        try {
            let sql = `
                SELECT city.*
                FROM public.city AS city
                     INNER JOIN public.state AS state
                          ON    state.id_state = city.id_state
                WHERE "id_city" IS NOT NULL
            `
            if (name) sql = sql + 'AND city.name LIKE \'%\' || $<name> || \'%\''
            if (acronymState) sql = sql + '\nAND state.acronym = $<acronymState>'
            if (idIbge) sql = sql + '\nAND city.id_ibge = $<idIbge>'

            const result = await this.connection.query(sql, { name, acronymState, idIbge })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.city', 'index', __filename, error)
        }
    }

    async show (idCity: number): Promise<City | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT city.*
                FROM public.city AS city                     
                WHERE "id_city" = $<idCity>
            `
            const result = await this.connection.query(sql, { idCity })
            if (!result || result.length === 0) {
                throw new NotFoundException(`City with ID ${idCity} not found`)
            }
            return result[0]
        } catch (error) {
            return MakeErrorRequestResponseV2('public.city', 'show', __filename, error)
        }
    }

    async store (createOrUpdateDto: CreateOrUpdateDto, state: State): Promise<Pick<City, 'id_city'> | ErrorRequestResponse> {
        const { name, idIbge } = createOrUpdateDto
        try {
            const sql = `
                INSERT INTO public.city(name, id_ibge, id_state)
                VALUES ($<name>, $<idIbge>, $<idState>)
                RETURNING id_city
            `
            const result = await this.connection.one(sql, { name, idIbge, idState: state.id_state })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.city', 'store', __filename, error)
        }
    }

    async update (idCity: number, createOrUpdateDto: CreateOrUpdateDto, state: State): Promise<City| ErrorRequestResponse> {
        const { name, idIbge } = createOrUpdateDto
        try {
            const sql = `
                UPDATE public.city 
                SET name = $<name>, id_ibge = $<idIbge>, id_state = $<idState>
                WHERE id_city = $<idCity>
            `
            const result = await this.connection.result(sql, { idCity, name, idIbge, idState: state.id_state })
            if (result.rowCount) {
                return this.show(idCity)
            }
        } catch (error) {
            return MakeErrorRequestResponseV2('public.city', 'store', __filename, error)
        }
    }

    async destroy (idCity: number): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const sql = `
                DELETE
                FROM public.city AS city                     
                WHERE city."id_city" = $<idCity>
            `
            const result = await this.connection.result(sql, { idCity })
            if (result.rowCount) {
                return MakeDeleteResult('public.city', idCity)
            }
        } catch (error) {
            return MakeErrorRequestResponseV2('public.city', 'destroy', __filename, error)
        }
    }
}