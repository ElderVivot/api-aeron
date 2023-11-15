import { MakeDeleteResult } from '@common/factories/make-deleted-success'
import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { Connection } from '@database/connection'
import { NotFoundException, Inject } from '@nestjs/common'

import { AccessPortals } from './access_portals.entity'
import { FilterDto } from './dto/filter.dto'

export class AccessPortalsRepository {
    constructor (@Inject('CONNECTION') private connection: Connection) { }

    async index (dto: FilterDto, tenant: string): Promise<AccessPortals[] | ErrorRequestResponse> {
        const { _page, _limit, idTypeAccessPortals, login, nameAccess, status, whatAccesses, getPaswordIncorrect, loginLikeSearch } = dto
        try {
            let sql = `
                SELECT access_portals.*, type_access_portals."nameTypeAccess"
                FROM "${tenant}".access_portals AS access_portals
                     INNER JOIN public.type_access_portals AS type_access_portals
                          ON    type_access_portals."idTypeAccessPortals" = access_portals."idTypeAccessPortals"
                WHERE access_portals."idAccessPortals" IS NOT NULL
            `
            if (nameAccess) sql = sql + 'AND access_portals."nameAccess" LIKE \'%\' || $<nameAccess> || \'%\''
            if (login) sql = sql + 'AND access_portals."login" = $<login>'
            if (loginLikeSearch) sql = sql + 'AND access_portals."login" LIKE \'%\' || $<loginLikeSearch> || \'%\''
            if (idTypeAccessPortals) sql = sql + 'AND access_portals."idTypeAccessPortals" = $<idTypeAccessPortals>'
            if (status) sql = sql + 'AND access_portals."status" = $<status>'
            if (whatAccesses) sql = sql + 'AND type_access_portals."whatAccesses" = $<whatAccesses>'
            if (getPaswordIncorrect && getPaswordIncorrect === 'no') {
                sql = sql + 'AND ( access_portals."timestampPasswordIncorrect" IS NULL OR access_portals."timestampPasswordIncorrect" < access_portals."updatedAt" )'
            }

            const page = Number(_page)
            const limit = Number(_limit)
            let _offset = 0
            if (page && limit) {
                if (page > 1) _offset = (page - 1) * limit
                sql = sql + `
                    LIMIT $<_limit>
                    OFFSET $<_offset>
                `
            }

            const result = await this.connection.query(sql, { ...dto, _offset })
            const clients: AccessPortals[] = result
            return clients
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.access_portals`, 'index', __filename, error)
        }
    }

    async indexCountWithoutFilterPage (dto: FilterDto, tenant: string): Promise<{count: string} | ErrorRequestResponse> {
        const { idTypeAccessPortals, login, nameAccess, status, whatAccesses, getPaswordIncorrect, loginLikeSearch } = dto
        try {
            let sql = `
                SELECT COUNT(8)
                FROM "${tenant}".access_portals AS access_portals
                     INNER JOIN public.type_access_portals AS type_access_portals
                          ON    type_access_portals."idTypeAccessPortals" = access_portals."idTypeAccessPortals"
                WHERE access_portals."idAccessPortals" IS NOT NULL
            `
            if (nameAccess) sql = sql + 'AND access_portals."nameAccess" LIKE \'%\' || $<nameAccess> || \'%\''
            if (login) sql = sql + 'AND access_portals."login" = $<login>'
            if (loginLikeSearch) sql = sql + 'AND access_portals."login" LIKE \'%\' || $<loginLikeSearch> || \'%\''
            if (idTypeAccessPortals) sql = sql + 'AND access_portals."idTypeAccessPortals" = $<idTypeAccessPortals>'
            if (status) sql = sql + 'AND access_portals."status" = $<status>'
            if (whatAccesses) sql = sql + 'AND type_access_portals."whatAccesses" = $<whatAccesses>'
            if (getPaswordIncorrect && getPaswordIncorrect === 'no') {
                sql = sql + 'AND ( access_portals."timestampPasswordIncorrect" IS NULL OR access_portals."timestampPasswordIncorrect" < access_portals."updatedAt" )'
            }

            const data: {count: string} = await this.connection.one(sql,
                { ...dto }
            )
            return data
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.access_portals`, 'index', __filename, error)
        }
    }

    async show (idAccessPortals: string, tenant: string): Promise<AccessPortals | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT access_portals.*
                FROM "${tenant}".access_portals AS access_portals
                WHERE "idAccessPortals" = $<idAccessPortals>
            `
            const result = await this.connection.query(sql, { idAccessPortals })
            if (!result || result.length === 0) throw new NotFoundException(`AccessPortals with ID ${idAccessPortals} not found`)
            const client: AccessPortals = result[0]
            return client
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.access_portals`, 'show', __filename, error)
        }
    }

    async store (accessPortals: AccessPortals, tenant: string): Promise<Pick<AccessPortals, 'idAccessPortals'> | ErrorRequestResponse> {
        try {
            const sql = `
                INSERT INTO "${tenant}".access_portals("idAccessPortals", "idTypeAccessPortals", "createdAt", "updatedAt", "nameAccess", "login",  
                            "password", "status")
                VALUES ($<idAccessPortals>, $<idTypeAccessPortals>, $<createdAt>, $<updatedAt>, $<nameAccess>, $<login>, $<password>, $<status>)
                RETURNING "idAccessPortals"
            `
            const result = await this.connection.one(sql, { ...accessPortals })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.access_portals`, 'store', __filename, error)
        }
    }

    async update (accessPortals: AccessPortals, tenant: string): Promise<void | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE "${tenant}".access_portals
                SET "idTypeAccessPortals" = $<idTypeAccessPortals>, "updatedAt" = $<updatedAt>, "nameAccess" = $<nameAccess>, 
                    "login" = $<login>, "password" = $<password>, "status" = $<status>
                WHERE "idAccessPortals" = $<idAccessPortals>
            `
            await this.connection.result(sql, { ...accessPortals })
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.access_portals`, 'update', __filename, error)
        }
    }

    async updateDataAboutPasswordIncorrect (idAccessPortals: string, tenant: string, timestampPasswordIncorrect: Date): Promise<void | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE "${tenant}".access_portals
                SET "timestampPasswordIncorrect" = $<timestampPasswordIncorrect>
                WHERE "idAccessPortals" = $<idAccessPortals>
            `
            await this.connection.result(sql, { idAccessPortals, timestampPasswordIncorrect })
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.access_portals`, 'updateDataAboutPasswordIncorrect', __filename, error)
        }
    }

    async destroy (idAccessPortals: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const sql = `
                DELETE
                FROM "${tenant}".access_portals AS access_portals
                WHERE access_portals."idAccessPortals" = $<idAccessPortals>
            `
            const result = await this.connection.result(sql, { idAccessPortals })
            if (result.rowCount) {
                return MakeDeleteResult(`${tenant}.access_portals`, idAccessPortals)
            }
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.access_portals`, 'destroy', __filename, error)
        }
    }
}