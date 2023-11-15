import { AwsS3 } from '@common/aws/s3/s3'
import { MakeErrorRequestResponseV2, ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { convertStringToListString } from '@common/utils/convert-string-to-list'
import { CompanieRepository } from '@modules/tenant/companie/companie.repository'
import { Inject, Injectable } from '@nestjs/common'

import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'
import { LogNfsPrefGyn } from './log-nfs-pref-gyn.entity'
import { LogNfsPrefGynRepository } from './log-nfs-pref-gyn.repository'

@Injectable()
export class LogNfsPrefGynService {
    constructor (
        @Inject('AWS_S3') private awsS3: AwsS3,
        private repository: LogNfsPrefGynRepository,
        private companieRepository: CompanieRepository
    ) { }

    private async getIdCompanie (dto: CreateOrUpdateDto | FilterDto, tenant: string): Promise<string> {
        let idCompanie = dto.idCompanie
        const { federalRegistration, codeCompanieAccountSystem, cityRegistration } = dto
        if (!idCompanie && (federalRegistration || codeCompanieAccountSystem || cityRegistration)) {
            let filter = {}
            if (cityRegistration) filter = { cityRegistration }
            if (federalRegistration) filter = { federalRegistration }
            if (codeCompanieAccountSystem) filter = { codeCompanieAccountSystem }
            const companie = await this.companieRepository.index({ ...filter }, tenant)
            if (companie instanceof ErrorRequestResponse) throw companie
            if (companie.length === 0) return undefined
            idCompanie = companie[0].idCompanie
        }
        return idCompanie
    }

    async index (dto: FilterDto, tenant: string): Promise<{ data:LogNfsPrefGyn[], count: string} | ErrorRequestResponse> {
        try {
            if (dto.federalRegistration || dto.codeCompanieAccountSystem || dto.cityRegistration) dto.idCompanie = await this.getIdCompanie(dto, tenant)

            dto.codeCompanies = convertStringToListString(dto.codeCompanies)
            dto.cityRegistrationList = convertStringToListString(dto.cityRegistrationList)
            const indexData = await this.repository.index(dto, tenant)
            if (indexData instanceof ErrorRequestResponse) throw indexData

            // for pagination in frontend
            const indexCountWithoutFilterPage = await this.repository.indexCountWithoutFilterPage(dto, tenant)
            if (indexCountWithoutFilterPage instanceof ErrorRequestResponse) throw indexCountWithoutFilterPage

            return { data: indexData, count: indexCountWithoutFilterPage.count }
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nfs_pref_gyn`, 'index', __filename, error)
        }
    }

    async show (idLogNfsPrefGyn: string, tenant: string): Promise<LogNfsPrefGyn | ErrorRequestResponse> {
        return await this.repository.show(idLogNfsPrefGyn, tenant)
    }

    async store (dto: CreateOrUpdateDto, tenant: string): Promise<Pick<LogNfsPrefGyn, 'idLogNfsPrefGyn'> | ErrorRequestResponse> {
        try {
            const objCityRegestritationOrIdAccessPortals = dto.cityRegistration ? { cityRegistration: dto.cityRegistration } : { idAccessPortals: dto.idAccessPortals }
            const existOtherLogNotFiscal = await this.repository.index(
                {
                    dateStartDown: dto.dateStartDown,
                    dateEndDown: dto.dateEndDown,
                    ...objCityRegestritationOrIdAccessPortals
                },
                tenant
            )
            if (existOtherLogNotFiscal instanceof ErrorRequestResponse) throw existOtherLogNotFiscal
            if (existOtherLogNotFiscal.length > 0) throw new Error('ALREADY EXIST LOG WITH THIS cityRegistration or idAccessPortals, and dateStartDown and dateEndDown')

            let logNotaFiscal = new LogNfsPrefGyn()
            logNotaFiscal.createdAt = new Date()
            logNotaFiscal.updatedAt = logNotaFiscal.createdAt
            logNotaFiscal.idCompanie = await this.getIdCompanie(dto, tenant)

            logNotaFiscal = Object.assign(logNotaFiscal, dto)
            logNotaFiscal.urlsXmls = dto.urlsXmls || ''
            logNotaFiscal.urlPrintLog = dto.urlPrintLog || ''

            return await this.repository.store(logNotaFiscal, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nfs_pref_gyn`, 'store', __filename, error)
        }
    }

    async update (idLogNfsPrefGyn: string, dto: CreateOrUpdateDto, tenant: string): Promise<LogNfsPrefGyn | ErrorRequestResponse> {
        try {
            let logNotaFiscal = await this.show(idLogNfsPrefGyn, tenant)
            if (logNotaFiscal instanceof ErrorRequestResponse) throw logNotaFiscal

            logNotaFiscal = Object.assign(logNotaFiscal, dto)

            logNotaFiscal.updatedAt = new Date()
            logNotaFiscal.urlsXmls = dto.urlsXmls || ''
            logNotaFiscal.urlPrintLog = dto.urlPrintLog || ''

            await this.repository.update(logNotaFiscal, tenant)
            return await this.show(idLogNfsPrefGyn, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nfs_pref_gyn`, 'update', __filename, error)
        }
    }

    async uploadPrintLog (idLogNfsPrefGyn: string, bufferImage: string | Buffer, tenant: string): Promise<LogNfsPrefGyn | ErrorRequestResponse> {
        try {
            const logNotaFiscal = await this.show(idLogNfsPrefGyn, tenant)
            if (logNotaFiscal instanceof ErrorRequestResponse) throw logNotaFiscal

            const resultUpload = await this.awsS3.upload(bufferImage, `${tenant}/log-nota-fiscal`)
            if (resultUpload instanceof ErrorRequestResponse) throw resultUpload

            const { urlPrintLog } = logNotaFiscal
            if (urlPrintLog) {
                const key = urlPrintLog.split('.com/')[1]
                await this.awsS3.delete(key)
            }
            await this.repository.updateUrlPrintLog(idLogNfsPrefGyn, resultUpload.Location, tenant)

            return await this.show(idLogNfsPrefGyn, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nfs_pref_gyn`, 'uploadPrintLog', __filename, error)
        }
    }
}