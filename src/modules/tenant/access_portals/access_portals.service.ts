import { CryptImplementation, makeCryptImplementation } from '@common/adapters/crypt'
import { MakeErrorRequestResponseV2, ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { Injectable } from '@nestjs/common'

import { AccessPortals } from './access_portals.entity'
import { AccessPortalsRepository } from './access_portals.repository'
import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'

@Injectable()
export class AccessPortalsService {
    private cryptImplementation: CryptImplementation

    constructor (
        private repository: AccessPortalsRepository
    ) {
        this.cryptImplementation = makeCryptImplementation()
    }

    async index (dto: FilterDto, tenant: string): Promise<{ data:AccessPortals[], count: string} | ErrorRequestResponse> {
        try {
            const indexData = await this.repository.index(dto, tenant)
            if (indexData instanceof ErrorRequestResponse) throw indexData

            // for pagination in frontend
            const indexCountWithoutFilterPage = await this.repository.indexCountWithoutFilterPage(dto, tenant)
            if (indexCountWithoutFilterPage instanceof ErrorRequestResponse) throw indexCountWithoutFilterPage

            return { data: indexData, count: indexCountWithoutFilterPage.count }
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.accessPortals`, 'index', __filename, error)
        }
    }

    async show (idAccessPortals: string, tenant: string): Promise<AccessPortals | ErrorRequestResponse> {
        return await this.repository.show(idAccessPortals, tenant)
    }

    async showWithDecryptPassword (idAccessPortals: string, tenant: string): Promise<AccessPortals | ErrorRequestResponse> {
        try {
            const accessPortals = await this.show(idAccessPortals, tenant)
            if (accessPortals instanceof ErrorRequestResponse) throw accessPortals

            accessPortals.passwordDecrypt = this.cryptImplementation.decrypt(accessPortals.password)

            return accessPortals
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.accessPortals`, 'showWithDecryptPassword', __filename, error)
        }
    }

    async store (dto: CreateOrUpdateDto, tenant: string): Promise<Pick<AccessPortals, 'idAccessPortals'> | ErrorRequestResponse> {
        try {
            let accessPortals = new AccessPortals()
            accessPortals.createdAt = new Date()
            accessPortals.updatedAt = new Date()

            accessPortals = Object.assign(accessPortals, dto)

            accessPortals.password = this.cryptImplementation.encrypt(dto.password)

            const listAlreadyAccessPortals = await this.index({
                idTypeAccessPortals: dto.idTypeAccessPortals,
                login: dto.login
            }, tenant)
            if (listAlreadyAccessPortals instanceof ErrorRequestResponse) throw listAlreadyAccessPortals
            if (listAlreadyAccessPortals && listAlreadyAccessPortals.data.length > 0) {
                const idAccessPortals = listAlreadyAccessPortals[0].idAccessPortals
                accessPortals.status = 'ACTIVE'
                await this.update(idAccessPortals, accessPortals, tenant)
                return this.show(idAccessPortals, tenant)
            } else {
                return await this.repository.store(accessPortals, tenant)
            }
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.accessPortals`, 'store', __filename, error)
        }
    }

    async destroy (idAccessPortals: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const accessPortals = await this.show(idAccessPortals, tenant)
            if (accessPortals instanceof ErrorRequestResponse) throw accessPortals

            return await this.repository.destroy(idAccessPortals, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.accessPortals`, 'destroy', __filename, error)
        }
    }

    async update (idAccessPortals: string, dto: CreateOrUpdateDto, tenant: string): Promise<AccessPortals | ErrorRequestResponse> {
        try {
            let accessPortals = await this.show(idAccessPortals, tenant)
            if (accessPortals instanceof ErrorRequestResponse) throw accessPortals

            // update password only if encrypt different of acessPortals.password
            if (accessPortals.password !== dto.password) {
                dto.password = this.cryptImplementation.encrypt(dto.password)
            }

            accessPortals = Object.assign(accessPortals, dto)

            accessPortals.updatedAt = new Date()

            await this.repository.update(accessPortals, tenant)
            return await this.show(idAccessPortals, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.accessPortals`, 'update', __filename, error)
        }
    }

    async updateDataAboutPasswordIncorrect (idAccessPortals: string, tenant: string): Promise<AccessPortals | ErrorRequestResponse> {
        try {
            const accessPortals = await this.show(idAccessPortals, tenant)
            if (accessPortals instanceof ErrorRequestResponse) throw accessPortals

            const timestampPasswordIncorrect = new Date()

            await this.repository.updateDataAboutPasswordIncorrect(idAccessPortals, tenant, timestampPasswordIncorrect)
            return await this.show(idAccessPortals, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.accessPortals`, 'update', __filename, error)
        }
    }
}