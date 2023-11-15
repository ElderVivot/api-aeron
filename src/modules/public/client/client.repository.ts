import { MakeDeleteResult } from '@common/factories/make-deleted-success'
import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { Connection } from '@database/connection'
import { NotFoundException, Inject } from '@nestjs/common'

import { Client } from './client.entity'
import { AddUserDto } from './dto/add-user.dto'
import { GetClientFilterDto } from './dto/get-client-filter.dto'

interface IErrorAddUsers {
    idUser: string
    error: any
}

export class ClientRepository {
    constructor (@Inject('CONNECTION') private connection: Connection) { }

    async index (getClientFilter: GetClientFilterDto): Promise<Client[] | ErrorRequestResponse> {
        const { name, status, federalRegistration } = getClientFilter
        try {
            let sql = `
                SELECT client.*
                FROM public.client AS client                     
                WHERE "idClient" IS NOT NULL
            `
            if (name) sql = sql + 'AND "name" LIKE \'%\' || $<name> || \'%\''
            if (status) sql = sql + 'AND "status" = $<status>'
            if (federalRegistration) sql = sql + 'AND "federalRegistration" = $<federalRegistration>'

            const result = await this.connection.query(sql, { name, status, federalRegistration })
            const clients: Client[] = result
            return clients
        } catch (error) {
            return MakeErrorRequestResponseV2('public.client', 'show', __filename, error)
        }
    }

    async show (idClient: string): Promise<Client | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT client.*
                FROM public.client AS client                     
                WHERE "idClient" = $<idClient>
            `
            const result = await this.connection.query(sql, { idClient })
            if (!result || result.length === 0) throw new NotFoundException(`Client with ID ${idClient} not found`)
            const client: Client = result[0]
            return client
        } catch (error) {
            return MakeErrorRequestResponseV2('public.client', 'show', __filename, error)
        }
    }

    async store (client: Client): Promise<Pick<Client, 'idClient'> | ErrorRequestResponse> {
        try {
            const sql = `
                INSERT INTO public.client("idClient", "createdAt", "updatedAt", "name", "nickName", "typeFederalRegistration",
                                          "federalRegistration", "status", "dddPhone", "phone", "email", "neighborhood", "street",
                                          "zipCode", "complement", "referency", "dateAsClient", "idCity")
                VALUES ($<idClient>, $<createdAt>, $<updatedAt>, $<name>, $<nickName>, $<typeFederalRegistration>,  
                        $<federalRegistration>, $<status>, $<dddPhone>, $<phone>, $<email>, $<neighborhood>, $<street>,
                        $<zipCode>, $<complement>, $<referency>, $<dateAsClient>, $<idCity>)
                RETURNING "idClient"
            `
            const result = await this.connection.one(sql, { ...client })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.client', 'store', __filename, error)
        }
    }

    async update (client: Client): Promise<void | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE public.client
                SET "updatedAt" = $<updatedAt>, "name" = $<name>, "nickName" = $<nickName>, "typeFederalRegistration" = $<typeFederalRegistration>,  
                    "federalRegistration" = $<federalRegistration>, "status" = $<status>, "dddPhone" = $<dddPhone>, 
                    "phone" = $<phone>, "email" = $<email>, "neighborhood" = $<neighborhood>, "street" = $<street>,
                    "zipCode" = $<zipCode>, "complement" = $<complement>, "referency" = $<referency>, "dateAsClient" = $<dateAsClient>, 
                    "idCity" = $<idCity>
                WHERE "idClient" = $<idClient>
            `
            await this.connection.result(sql, { ...client })
        } catch (error) {
            return MakeErrorRequestResponseV2('public.client', 'update', __filename, error)
        }
    }

    async destroy (idClient: string): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const sql = `
                DELETE
                FROM public.client AS client                     
                WHERE client."idClient" = $<idClient>
            `
            const result = await this.connection.result(sql, { idClient })
            if (result.rowCount) {
                return MakeDeleteResult('public.client', idClient)
            }
        } catch (error) {
            return MakeErrorRequestResponseV2('public.client', 'destroy', __filename, error)
        }
    }

    async addUsers (idClient: string, addUsersDto: AddUserDto): Promise<void | ErrorRequestResponse> {
        const listIdUserDontPossibleAdd: IErrorAddUsers[] = []
        try {
            const { usersId } = addUsersDto
            for (const idUser of usersId) {
                try {
                    const sql = `
                        INSERT INTO public.client_x_user_client("idClient", "idUser", "createdAt", "updatedAt" )
                        VALUES ($<idClient>, $<idUser>, $<createdAt>, $<updatedAt>)
                        RETURNING "idClient"
                    `
                    const createdAt = new Date()
                    const updatedAt = createdAt
                    await this.connection.one(sql, { idClient, idUser, createdAt, updatedAt })
                } catch (error) {
                    let errorMessage = error
                    if (error.code === '23503') {
                        errorMessage = 'Its dont find user with this id'
                    }
                    listIdUserDontPossibleAdd.push({
                        idUser,
                        error: errorMessage
                    })
                }
            }
            if (listIdUserDontPossibleAdd.length > 0) {
                throw new Error('Error add any user')
            }
        } catch (error) {
            if (error === 'Error add any user') {
                return MakeErrorRequestResponseV2('public.client', 'addUsers', __filename, listIdUserDontPossibleAdd)
            }
            return MakeErrorRequestResponseV2('public.client', 'addUsers', __filename, error)
        }
    }
}