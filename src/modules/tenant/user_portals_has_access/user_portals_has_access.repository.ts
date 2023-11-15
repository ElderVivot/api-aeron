import { MakeDeleteResult } from '@common/factories/make-deleted-success'
import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { Connection } from '@database/connection'
import { NotFoundException, Inject } from '@nestjs/common'

import { FilterDto } from './dto/filter.dto'
import { UserPortalsHasAccess } from './user_portals_has_access.entity'

export class UserPortalsHasAccessRepository {
    constructor (@Inject('CONNECTION') private connection: Connection) { }

    async index (dto: FilterDto, tenant: string): Promise<UserPortalsHasAccess[] | ErrorRequestResponse> {
        const { cityRegistration, federalRegistration, idAccessPortals, stateRegistration, status, idTypeAccessPortals, idCertificate } = dto
        try {
            let sql = `
                SELECT user_portals_has_access.*
                FROM "${tenant}".user_portals_has_access AS user_portals_has_access
                WHERE user_portals_has_access."idUserPortalsHasAccess" IS NOT NULL
            `
            if (cityRegistration) sql = sql + 'AND "cityRegistration" = $<cityRegistration>'
            if (federalRegistration) sql = sql + 'AND "federalRegistration" = $<federalRegistration>'
            if (idAccessPortals) sql = sql + 'AND "idAccessPortals" = $<idAccessPortals>'
            if (stateRegistration) sql = sql + 'AND "stateRegistration" = $<stateRegistration>'
            if (status) sql = sql + 'AND "status" = $<status>'
            if (idTypeAccessPortals) sql = sql + 'AND "idTypeAccessPortals" = $<idTypeAccessPortals>'
            if (idCertificate) sql = sql + 'AND "idCertificate" = $<idCertificate>'

            const result = await this.connection.query(sql, dto)
            const clients: UserPortalsHasAccess[] = result
            return clients
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.user_portals_has_access`, 'index', __filename, error)
        }
    }

    async show (idUserPortalsHasAccess: string, tenant: string): Promise<UserPortalsHasAccess | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT user_portals_has_access.*
                FROM "${tenant}".user_portals_has_access AS user_portals_has_access
                WHERE "idUserPortalsHasAccess" = $<idUserPortalsHasAccess>
            `
            const result = await this.connection.query(sql, { idUserPortalsHasAccess })
            if (!result || result.length === 0) throw new NotFoundException(`UserPortalsHasAccess with ID ${idUserPortalsHasAccess} not found`)
            const client: UserPortalsHasAccess = result[0]
            return client
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.user_portals_has_access`, 'show', __filename, error)
        }
    }

    async store (userPortalsHasAccess: UserPortalsHasAccess, tenant: string): Promise<Pick<UserPortalsHasAccess, 'idUserPortalsHasAccess'> | ErrorRequestResponse> {
        try {
            const sql = `
                INSERT INTO "${tenant}".user_portals_has_access("idUserPortalsHasAccess", "idTypeAccessPortals", "idAccessPortals", "idCertificate", "createdAt", "updatedAt", 
                            "nameCompanie", "status",  "stateRegistration", "cityRegistration", "federalRegistration", "nameCity", "dateStartAccess", "dateEndAccess")
                VALUES ($<idUserPortalsHasAccess>, $<idTypeAccessPortals>, $<idAccessPortals>, $<idCertificate>, $<createdAt>, $<updatedAt>, $<nameCompanie>, $<status>, $<stateRegistration>, 
                        $<cityRegistration>, $<federalRegistration>, $<nameCity>, $<dateStartAccess>, $<dateEndAccess>)
                RETURNING "idUserPortalsHasAccess"
            `
            const result = await this.connection.one(sql, { ...userPortalsHasAccess })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.user_portals_has_access`, 'store', __filename, error)
        }
    }

    async update (userPortalsHasAccess: UserPortalsHasAccess, tenant: string): Promise<void | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE "${tenant}".user_portals_has_access
                SET "updatedAt" = $<updatedAt>, "idTypeAccessPortals" = $<idTypeAccessPortals>, "idAccessPortals" = $<idAccessPortals>, "idCertificate" = $<idCertificate>,   
                    "nameCompanie" = $<nameCompanie>, "status" = $<status>, "stateRegistration" = $<stateRegistration>, "cityRegistration" = $<cityRegistration>, 
                    "federalRegistration" = $<federalRegistration>, "nameCity" = $<nameCity>, "dateStartAccess" = $<dateStartAccess>, "dateEndAccess" = $<dateEndAccess>
                WHERE "idUserPortalsHasAccess" = $<idUserPortalsHasAccess>
            `
            await this.connection.result(sql, { ...userPortalsHasAccess })
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.user_portals_has_access`, 'update', __filename, error)
        }
    }

    async destroy (idUserPortalsHasAccess: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const sql = `
                DELETE
                FROM "${tenant}".user_portals_has_access AS user_portals_has_access
                WHERE user_portals_has_access."idUserPortalsHasAccess" = $<idUserPortalsHasAccess>
            `
            const result = await this.connection.result(sql, { idUserPortalsHasAccess })
            if (result.rowCount) {
                return MakeDeleteResult(`${tenant}.user_portals_has_access`, idUserPortalsHasAccess)
            }
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.user_portals_has_access`, 'destroy', __filename, error)
        }
    }
}