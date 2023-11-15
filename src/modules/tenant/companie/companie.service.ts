import { makeDateImplementation } from '@common/adapters/date/date-factory'
import { DateImplementation } from '@common/adapters/date/date-implementation'
import { MakeErrorRequestResponseV2, ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { convertStringToListString } from '@common/utils/convert-string-to-list'
import { CityRepository } from '@modules/public/city/city.repository'
import { Injectable } from '@nestjs/common'

import { Companie } from './companie.entity'
import { CompanieRepository } from './companie.repository'
import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'
import { ECompanieStatus } from './types/e-companie-status'

@Injectable()
export class CompanieService {
    private dateImplementation: DateImplementation

    constructor (
        private repository: CompanieRepository,
        private cityRepository: CityRepository
    ) {
        this.dateImplementation = makeDateImplementation()
    }

    private async getIdCity (idIbgeCity: number): Promise<number> {
        const cities = await this.cityRepository.index({ idIbge: idIbgeCity })
        if (cities instanceof ErrorRequestResponse || !cities.length) {
            return 1
        }
        const city = cities[0]
        return city.id_city
    }

    private async getIdCompanie (dto: CreateOrUpdateDto, tenant: string): Promise<string> {
        const { codeCompanieAccountSystem } = dto
        const companie = await this.repository.index(
            {
                codeCompanieAccountSystem
            },
            tenant
        )
        if (companie instanceof ErrorRequestResponse) return ''
        if (companie.length === 0) return ''
        const idCompanie = companie[0].idCompanie
        return idCompanie
    }

    async index (dto: FilterDto, tenant: string): Promise<{ data:Companie[], count: string} | ErrorRequestResponse> {
        try {
            dto.codeCompanies = convertStringToListString(dto.codeCompanies)

            const indexData = await this.repository.index(dto, tenant)
            if (indexData instanceof ErrorRequestResponse) throw indexData

            // for pagination in frontend
            const indexCountWithoutFilterPage = await this.repository.indexCountWithoutFilterPage(dto, tenant)
            if (indexCountWithoutFilterPage instanceof ErrorRequestResponse) throw indexCountWithoutFilterPage

            return { data: indexData, count: indexCountWithoutFilterPage.count }
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'index', __filename, error)
        }
    }

    async indexOnlyIDCompanie (dto: FilterDto, tenant: string): Promise<{ data:{listIdCompanie: string}, count: string} | ErrorRequestResponse> {
        try {
            dto.codeCompanies = convertStringToListString(dto.codeCompanies)
            let listIdCompanie = ''

            const indexData = await this.repository.indexOnlyIDCompanie(dto, tenant)
            if (indexData instanceof ErrorRequestResponse) throw indexData
            for (const [idx, companie] of indexData.entries()) {
                const comma = idx === indexData.length - 1 ? '' : ','
                listIdCompanie = listIdCompanie + companie.idCompanie + comma
            }

            // for pagination in frontend
            const indexCountWithoutFilterPage = await this.repository.indexOnlyIDCompanieCount(dto, tenant)
            if (indexCountWithoutFilterPage instanceof ErrorRequestResponse) throw indexCountWithoutFilterPage

            return { data: { listIdCompanie }, count: indexCountWithoutFilterPage.count }
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'index', __filename, error)
        }
    }

    async show (idCompanie: string, tenant: string): Promise<Companie | ErrorRequestResponse> {
        return await this.repository.show(idCompanie, tenant)
    }

    async store (dto: CreateOrUpdateDto, tenant: string): Promise<Pick<Companie, 'idCompanie'> | ErrorRequestResponse> {
        try {
            const idCompanieAlreadyExist = await this.getIdCompanie(dto, tenant)
            if (idCompanieAlreadyExist) return await this.update(idCompanieAlreadyExist, dto, tenant)

            let companie = new Companie()
            companie.createdAt = new Date()
            companie.updatedAt = new Date()
            companie = Object.assign(companie, dto)
            companie.nickName = companie.nickName || companie.name.split(' ')[0]
            companie.dateInicialAsCompanie = this.dateImplementation.zonedTimeToUtc(companie.dateInicialAsCompanie, 'America/Sao_Paulo')
            companie.dateInicialAsClient = this.dateImplementation.zonedTimeToUtc(companie.dateInicialAsClient, 'America/Sao_Paulo')
            companie.dateFinalAsClient = this.dateImplementation.zonedTimeToUtc(companie.dateFinalAsClient, 'America/Sao_Paulo')

            companie.idCity = await this.getIdCity(dto.idIbgeCity)

            if (!companie.status) companie.status = ECompanieStatus.ACTIVE

            return await this.repository.store(companie, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'store', __filename, error)
        }
    }

    async destroy (idCompanie: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const client = await this.show(idCompanie, tenant)
            if (client instanceof ErrorRequestResponse) throw client

            return await this.repository.destroy(idCompanie, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'destroy', __filename, error)
        }
    }

    async update (idCompanie: string, dto: CreateOrUpdateDto, tenant: string): Promise<Companie | ErrorRequestResponse> {
        try {
            let companie = await this.show(idCompanie, tenant)
            if (companie instanceof ErrorRequestResponse) throw companie

            companie = Object.assign(companie, dto)
            companie.updatedAt = new Date()

            companie.idCity = await this.getIdCity(dto.idIbgeCity)

            await this.repository.update(companie, tenant)
            return await this.show(idCompanie, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'update', __filename, error)
        }
    }
}