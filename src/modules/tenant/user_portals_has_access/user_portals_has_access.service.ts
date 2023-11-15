import { MakeErrorRequestResponseV2, ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { Injectable } from '@nestjs/common'

import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'
import { UserPortalsHasAccess } from './user_portals_has_access.entity'
import { UserPortalsHasAccessRepository } from './user_portals_has_access.repository'

@Injectable()
export class UserPortalsHasAccessService {
    constructor (
        private repository: UserPortalsHasAccessRepository
    ) { }

    private async getIdUserPortalsHasAccess (dto: CreateOrUpdateDto, tenant: string): Promise<string> {
        const { cityRegistration, federalRegistration, idAccessPortals, stateRegistration, idTypeAccessPortals, idCertificate } = dto
        const userPortalsHasAccess = await this.repository.index(
            {
                idTypeAccessPortals,
                cityRegistration,
                stateRegistration,
                federalRegistration,
                idAccessPortals,
                idCertificate
            },
            tenant
        )
        if (userPortalsHasAccess instanceof ErrorRequestResponse) return ''
        if (userPortalsHasAccess.length === 0) return ''
        const idUserPortalsHasAccess = userPortalsHasAccess[0].idUserPortalsHasAccess
        return idUserPortalsHasAccess
    }

    async index (dto: FilterDto, tenant: string): Promise<UserPortalsHasAccess[] | ErrorRequestResponse> {
        try {
            return await this.repository.index(dto, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.user_portals_has_access`, 'index', __filename, error)
        }
    }

    async show (idUserPortalsHasAccess: string, tenant: string): Promise<UserPortalsHasAccess | ErrorRequestResponse> {
        return await this.repository.show(idUserPortalsHasAccess, tenant)
    }

    async store (dto: CreateOrUpdateDto, tenant: string): Promise<Pick<UserPortalsHasAccess, 'idUserPortalsHasAccess'> | ErrorRequestResponse> {
        try {
            const idUserPortalsHasAccessAlreadyExist = await this.getIdUserPortalsHasAccess(dto, tenant)
            if (idUserPortalsHasAccessAlreadyExist) return await this.update(idUserPortalsHasAccessAlreadyExist, dto, tenant)

            let userPortalsHasAccess = new UserPortalsHasAccess()
            userPortalsHasAccess.createdAt = new Date()
            userPortalsHasAccess.updatedAt = new Date()

            userPortalsHasAccess = Object.assign(userPortalsHasAccess, dto)
            userPortalsHasAccess.idCertificate = userPortalsHasAccess.idCertificate ? userPortalsHasAccess.idCertificate : null
            userPortalsHasAccess.idAccessPortals = userPortalsHasAccess.idAccessPortals ? userPortalsHasAccess.idAccessPortals : null

            return await this.repository.store(userPortalsHasAccess, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.user_portals_has_access`, 'store', __filename, error)
        }
    }

    async destroy (idUserPortalsHasAccess: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const userPortalsHasAccess = await this.show(idUserPortalsHasAccess, tenant)
            if (userPortalsHasAccess instanceof ErrorRequestResponse) throw userPortalsHasAccess

            return await this.repository.destroy(idUserPortalsHasAccess, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.user_portals_has_access`, 'destroy', __filename, error)
        }
    }

    async update (idUserPortalsHasAccess: string, dto: CreateOrUpdateDto, tenant: string): Promise<UserPortalsHasAccess | ErrorRequestResponse> {
        try {
            let userPortalsHasAccess = await this.show(idUserPortalsHasAccess, tenant)
            if (userPortalsHasAccess instanceof ErrorRequestResponse) throw userPortalsHasAccess

            userPortalsHasAccess = Object.assign(userPortalsHasAccess, dto)

            userPortalsHasAccess.updatedAt = new Date()

            await this.repository.update(userPortalsHasAccess, tenant)
            return await this.show(idUserPortalsHasAccess, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.user_portals_has_access`, 'update', __filename, error)
        }
    }
}