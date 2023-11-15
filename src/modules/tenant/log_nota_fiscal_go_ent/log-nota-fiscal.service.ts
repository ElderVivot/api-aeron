import { AwsS3 } from '@common/aws/s3/s3'
import { MakeErrorRequestResponseV2, ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { convertStringToListString } from '@common/utils/convert-string-to-list'
import { CompanieRepository } from '@modules/tenant/companie/companie.repository'
import { Inject, Injectable } from '@nestjs/common'

import { Companie } from '../companie/companie.entity'
import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'
import { LogNotaFiscal } from './log-nota-fiscal.entity'
import { LogNotaFiscalRepository } from './log-nota-fiscal.repository'

@Injectable()
export class LogNotaFiscalService {
    constructor (
        @Inject('AWS_S3') private awsS3: AwsS3,
        private repository: LogNotaFiscalRepository,
        private companieRepository: CompanieRepository
    ) { }

    private async getIdCompanie (dto: CreateOrUpdateDto | FilterDto, tenant: string): Promise<string> {
        let idCompanie = dto.idCompanie
        const { federalRegistration, codeCompanieAccountSystem } = dto
        if (!idCompanie && !federalRegistration && !codeCompanieAccountSystem) {
            throw new Error('Its necessary to pass idCompanie, federalRegistration OR codeCompanieAccountSystem to find companie')
        }
        if (!idCompanie && (federalRegistration || codeCompanieAccountSystem)) {
            const companie = await this.companieRepository.index(
                {
                    federalRegistration,
                    codeCompanieAccountSystem
                },
                tenant
            )
            if (companie instanceof ErrorRequestResponse) throw companie
            if (companie.length === 0) throw new Error('Dont find any companie with this idCompanie, federalRegistration OR codeCompanieAccountSystem')
            idCompanie = companie[0].idCompanie
        }
        return idCompanie
    }

    async index (dto: FilterDto, tenant: string): Promise<LogNotaFiscal[] | ErrorRequestResponse> {
        try {
            if (dto.federalRegistration || dto.codeCompanieAccountSystem) dto.idCompanie = await this.getIdCompanie(dto, tenant)
            return await this.repository.index(dto, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nota_fiscal_go_ent`, 'index', __filename, error)
        }
    }

    async indexToFront (dto: FilterDto, tenant: string): Promise<{data:LogNotaFiscal[], count: string} | ErrorRequestResponse> {
        try {
            dto.codeCompanies = convertStringToListString(dto.codeCompanies)
            const indexData = await this.repository.indexToFront(dto, tenant)
            if (indexData instanceof ErrorRequestResponse) throw indexData

            // for pagination in frontend
            const indexCountWithoutFilterPage = await this.repository.indexToFrontCountWithoutFilterPage(dto, tenant)
            if (indexCountWithoutFilterPage instanceof ErrorRequestResponse) throw indexCountWithoutFilterPage

            return { data: indexData, count: indexCountWithoutFilterPage.count }
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nota_fiscal_go_ent`, 'index', __filename, error)
        }
    }

    async show (idLogNotaFiscal: string, tenant: string): Promise<LogNotaFiscal | ErrorRequestResponse> {
        return await this.repository.show(idLogNotaFiscal, tenant)
    }

    async store (dto: CreateOrUpdateDto, tenant: string): Promise<Pick<LogNotaFiscal, 'idLogNotaFiscal'> | ErrorRequestResponse> {
        try {
            let idCompanie = dto.idCompanie
            if (!idCompanie) idCompanie = await this.getIdCompanie(dto, tenant)

            const existOtherLogNotFiscal = await this.repository.index(
                {
                    idCompanie,
                    dateStartDown: dto.dateStartDown,
                    dateEndDown: dto.dateEndDown
                },
                tenant
            )
            if (existOtherLogNotFiscal instanceof ErrorRequestResponse) throw existOtherLogNotFiscal
            if (existOtherLogNotFiscal.length > 0) throw new Error('ALREADY EXIST LOG WITH THIS idCompanie, dateStartDown and dateEndDown')

            let logNotaFiscal = new LogNotaFiscal()
            logNotaFiscal.createdAt = new Date()
            logNotaFiscal.updatedAt = dto.updatedAt || new Date()
            logNotaFiscal.idCompanie = idCompanie
            logNotaFiscal.modelNotaFiscal = '00'

            logNotaFiscal = Object.assign(logNotaFiscal, dto)

            return await this.repository.store(logNotaFiscal, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nota_fiscal_go_ent`, 'store', __filename, error)
        }
    }

    async update (idLogNotaFiscal: string, dto: CreateOrUpdateDto, tenant: string): Promise<LogNotaFiscal | ErrorRequestResponse> {
        try {
            let logNotaFiscal = await this.show(idLogNotaFiscal, tenant)
            if (logNotaFiscal instanceof ErrorRequestResponse) throw logNotaFiscal

            logNotaFiscal = Object.assign(logNotaFiscal, dto)
            logNotaFiscal.modelNotaFiscal = '00'

            logNotaFiscal.updatedAt = new Date()

            await this.repository.update(logNotaFiscal, tenant)
            return await this.show(idLogNotaFiscal, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nota_fiscal_go_ent`, 'update', __filename, error)
        }
    }

    async getCompaniesThatDontProcessNotaFiscalYet (dto: FilterDto, tenant: string): Promise<Companie[] | ErrorRequestResponse> {
        dto.idCompanieList = convertStringToListString(dto.idCompanieList)
        return await this.repository.getCompaniesThatDontProcessNotaFiscalYet(dto, tenant)
    }
}