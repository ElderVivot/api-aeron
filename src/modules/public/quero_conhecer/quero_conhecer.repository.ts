import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { Connection } from '@database/connection'
import { NotFoundException, Inject } from '@nestjs/common'

import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'
import { QueroConhecer } from './quero_conhecer.entity'

export class QueroConhecerRepository {
    constructor (@Inject('CONNECTION') private connection: Connection) { }

    async index (filterDto: FilterDto): Promise<QueroConhecer[] | ErrorRequestResponse> {
        const { name, email, companie, occupation, phone, alreadyContactedTheCustomer } = filterDto
        try {
            let sql = `
                SELECT quero_conhecer.*
                FROM public.quero_conhecer AS quero_conhecer
                WHERE "idQueroConhecer" IS NOT NULL
            `
            if (name) sql = sql + 'AND "name" LIKE \'%\' || $<name> || \'%\''
            if (email) sql = sql + 'AND "email" = $<email>'
            if (phone) sql = sql + 'AND "phone" = $<phone>'
            if (occupation) sql = sql + 'AND "occupation" = $<occupation>'
            if (companie) sql = sql + 'AND "companie" LIKE \'%\' || $<companie> || \'%\''
            if (alreadyContactedTheCustomer && alreadyContactedTheCustomer === '1') {
                sql = sql + 'AND "alreadyContactedTheCustomer" = \'1\''
            }

            const result = await this.connection.query(sql, { ...filterDto })
            const data: QueroConhecer[] = result
            return data
        } catch (error) {
            return MakeErrorRequestResponseV2('public.quero_conhecer', 'show', __filename, error)
        }
    }

    async show (idQueroConhecer: string): Promise<QueroConhecer | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT quero_conhecer.*
                FROM public.quero_conhecer AS quero_conhecer
                WHERE "idQueroConhecer" = $<idQueroConhecer>
            `
            const result = await this.connection.query(sql, { idQueroConhecer })
            if (!result || result.length === 0) throw new NotFoundException(`QueroConhecer with ID ${idQueroConhecer} not found`)
            const data: QueroConhecer = result[0]
            return data
        } catch (error) {
            return MakeErrorRequestResponseV2('public.quero_conhecer', 'show', __filename, error)
        }
    }

    async store (dto: CreateOrUpdateDto): Promise<QueroConhecer | ErrorRequestResponse> {
        try {
            const sql = `
                INSERT INTO public.quero_conhecer("idQueroConhecer", "createdAt", "name", "email", "phone",
                            "companie", "occupation", "alreadyContactedTheCustomer")
                VALUES ($<idQueroConhecer>, $<createdAt>, $<name>, $<email>, $<phone>,  
                        $<companie>, $<occupation>, $<alreadyContactedTheCustomer>)
                RETURNING *
            `
            const result = await this.connection.one(sql, { ...dto })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.quero_conhecer', 'store', __filename, error)
        }
    }
}