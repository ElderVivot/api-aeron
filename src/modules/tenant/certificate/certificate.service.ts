import { CertInfoImplementation } from '@common/adapters/cert-info/cert-info.implementation'
import { CryptImplementation, makeCryptImplementation } from '@common/adapters/crypt'
import { makeDateImplementation } from '@common/adapters/date/date-factory'
import { DateImplementation } from '@common/adapters/date/date-implementation'
import { AwsS3 } from '@common/aws/s3/s3'
import { MakeErrorRequestResponseV2, ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { convertStringToListString } from '@common/utils/convert-string-to-list'
import { Inject, Injectable } from '@nestjs/common'

import { Certificate } from './certificate.entity'
import { CertificateRepository } from './certificate.repository'
import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'

@Injectable()
export class CertificateService {
    private dateImplementation: DateImplementation
    private cryptImplementation: CryptImplementation
    private certInfoImplementation: CertInfoImplementation

    constructor (
        @Inject('AWS_S3') private awsS3: AwsS3,
        private repository: CertificateRepository
    ) {
        this.dateImplementation = makeDateImplementation()
        this.cryptImplementation = makeCryptImplementation()
    }

    private async readCertificateInfo (dto: CreateOrUpdateDto) {
        const { file, password } = dto
        this.certInfoImplementation = new CertInfoImplementation(file, password)
        return await this.certInfoImplementation.readCertificateInfo()
    }

    private async loadFieldsCertificate (dto: CreateOrUpdateDto) {
        const certificateInfo = await this.readCertificateInfo(dto)
        if (certificateInfo instanceof ErrorRequestResponse) throw certificateInfo

        const commomName = certificateInfo.commonName
        const password = this.cryptImplementation.encrypt(dto.password)
        const nameCert = certificateInfo.nameCert
        const federalRegistration = certificateInfo.federalRegistration
        const eCpfCnpj = certificateInfo.eCpfOrCnpj
        const startDateValidity = this.dateImplementation.zonedTimeToUtc(certificateInfo.validity.start, 'America/Sao_Paulo')
        const endDateValidity = this.dateImplementation.zonedTimeToUtc(certificateInfo.validity.end, 'America/Sao_Paulo')

        return { commomName, password, nameCert, federalRegistration, eCpfCnpj, startDateValidity, endDateValidity }
    }

    async index (dto: FilterDto, tenant: string): Promise<Certificate[] | ErrorRequestResponse> {
        try {
            return await this.repository.index(dto, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'index', __filename, error)
        }
    }

    async getListCertificateNotOverdue (dto: FilterDto, tenant: string): Promise<string[] | ErrorRequestResponse> {
        try {
            const listToReturn = []
            const data = await this.repository.getListCertificateNotOverdue(dto, tenant)
            if (data instanceof ErrorRequestResponse) throw data
            for (const cert of data) {
                listToReturn.push(cert.federalRegistration)
            }
            return listToReturn
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'getListCertificateNotOverdue', __filename, error)
        }
    }

    async indexToFront (dto: FilterDto, tenant: string): Promise<{data:Certificate[], count: string} | ErrorRequestResponse> {
        try {
            dto.codeCompanies = convertStringToListString(dto.codeCompanies)
            const indexData = await this.repository.indexToFront(dto, tenant)
            if (indexData instanceof ErrorRequestResponse) throw indexData

            // for pagination in frontend
            const indexCountWithoutFilterPage = await this.repository.indexToFrontWithoutFilterPage(dto, tenant)
            if (indexCountWithoutFilterPage instanceof ErrorRequestResponse) throw indexCountWithoutFilterPage

            return { data: indexData, count: indexCountWithoutFilterPage.count }
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'indexToFront', __filename, error)
        }
    }

    async show (idCertificate: string, tenant: string): Promise<Certificate | ErrorRequestResponse> {
        return await this.repository.show(idCertificate, tenant)
    }

    async showWithDecryptPassword (idCertificate: string, tenant: string): Promise<Certificate | ErrorRequestResponse> {
        try {
            const certificate = await this.show(idCertificate, tenant)
            if (certificate instanceof ErrorRequestResponse) throw certificate

            certificate.passwordDecrypt = this.cryptImplementation.decrypt(certificate.password)

            return certificate
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'showWithDecryptPassword', __filename, error)
        }
    }

    async store (dto: CreateOrUpdateDto, tenant: string): Promise<Pick<Certificate, 'idCertificate'> | ErrorRequestResponse> {
        try {
            let certificate = new Certificate()
            certificate.createdAt = new Date()
            certificate.updatedAt = new Date()

            const certificateInfo = await this.loadFieldsCertificate(dto)
            certificate = Object.assign(certificate, certificateInfo)
            certificate.hasProcurationEcac = certificate.hasProcurationEcac || false

            const extensionFileSplit = dto.file.originalname.split('.')
            const extensionFile = extensionFileSplit[extensionFileSplit.length - 1]

            const listAlreadyCertificate = await this.index({ federalRegistration: certificate.federalRegistration }, tenant)
            if (listAlreadyCertificate instanceof ErrorRequestResponse) throw listAlreadyCertificate
            if (listAlreadyCertificate.length > 0) {
                const alreadyCertificate = listAlreadyCertificate[0]

                if (alreadyCertificate.endDateValidity > new Date()) throw new Error('CERTIFICATE_IS_NOT_OVERDUE')

                certificate.idCertificate = alreadyCertificate.idCertificate

                const { urlSaved } = alreadyCertificate
                if (urlSaved) {
                    const key = urlSaved.split('.com/')[1]
                    await this.awsS3.delete(key)
                }

                const resultUpload = await this.awsS3.upload(dto.file.buffer, `${tenant}/certificate`, extensionFile, 'application/pkcs12')
                if (resultUpload instanceof ErrorRequestResponse) throw resultUpload
                certificate.urlSaved = resultUpload.Location

                await this.repository.update(certificate, tenant)
                return await this.show(certificate.idCertificate, tenant)
            } else {
                const resultUpload = await this.awsS3.upload(dto.file.buffer, `${tenant}/certificate`, extensionFile, 'application/pkcs12')
                if (resultUpload instanceof ErrorRequestResponse) throw resultUpload
                certificate.urlSaved = resultUpload.Location

                return await this.repository.store(certificate, tenant)
            }
        } catch (error) {
            console.log({ tenant, ...dto })
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'store', __filename, error)
        }
    }

    async destroy (idCertificate: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const certificate = await this.show(idCertificate, tenant)
            if (certificate instanceof ErrorRequestResponse) throw certificate
            const { urlSaved } = certificate
            if (urlSaved) {
                const key = urlSaved.split('.com/')[1]
                await this.awsS3.delete(key)
            }

            return await this.repository.destroy(idCertificate, tenant)
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'destroy', __filename, error)
        }
    }

    async update (idCertificate: string, dto: CreateOrUpdateDto, tenant: string): Promise<Certificate | ErrorRequestResponse> {
        try {
            let certificate = await this.show(idCertificate, tenant)
            if (certificate instanceof ErrorRequestResponse) throw certificate

            const certificateInfo = await this.loadFieldsCertificate(dto)
            certificate = Object.assign(certificate, certificateInfo)

            certificate.updatedAt = new Date()

            const extensionFileSplit = dto.file.originalname.split('.')
            const extensionFile = extensionFileSplit[extensionFileSplit.length - 1]

            const { urlSaved } = certificate
            if (urlSaved) {
                const key = urlSaved.split('.com/')[1]
                await this.awsS3.delete(key)
            }

            const resultUpload = await this.awsS3.upload(dto.file.buffer, `${tenant}/certificate`, extensionFile, 'application/pkcs12')
            if (resultUpload instanceof ErrorRequestResponse) throw resultUpload
            certificate.urlSaved = resultUpload.Location

            await this.repository.update(certificate, tenant)
            return await this.show(idCertificate, tenant)
        } catch (error) {
            console.log({ tenant, ...dto })
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'update', __filename, error)
        }
    }
}