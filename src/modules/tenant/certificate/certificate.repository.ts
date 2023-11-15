import { MakeDeleteResult } from '@common/factories/make-deleted-success'
import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { Connection } from '@database/connection'
import { NotFoundException, Inject } from '@nestjs/common'

import { Certificate } from './certificate.entity'
import { FilterDto } from './dto/filter.dto'

export class CertificateRepository {
    constructor (@Inject('CONNECTION') private connection: Connection) { }

    async index (dto: FilterDto, tenant: string): Promise<Certificate[] | ErrorRequestResponse> {
        const { nameCert, endDateValidity, federalRegistration, hasProcurationEcac } = dto
        try {
            let sql = `
                SELECT certificate.*, companie."codeCompanieAccountSystem", 
                       CASE WHEN companie."status" IS NULL THEN 'DONT_FIND' ELSE companie."status" END AS "statusCompanie",
                       CASE WHEN certificate."endDateValidity" < now() THEN 'OVERDUE' ELSE 'ACTIVE' END AS "statusCert"
                FROM "${tenant}".certificate AS certificate
                     LEFT JOIN "${tenant}".companie AS companie
                         ON    companie."federalRegistration" = certificate."federalRegistration"                  
                WHERE certificate."idCertificate" IS NOT NULL
            `
            if (nameCert) sql = sql + 'AND certificate."nameCert" LIKE \'%\' || $<nameCert> || \'%\''
            if (federalRegistration) sql = sql + 'AND certificate."federalRegistration" = $<federalRegistration>'
            if (hasProcurationEcac && hasProcurationEcac === '1') sql = sql + 'AND certificate."hasProcurationEcac" = true'
            if (endDateValidity) sql = sql + 'AND DATE(certificate."endDateValidity") >= DATE($<endDateValidity>)'

            sql = sql + '\nORDER BY certificate."eCpfCnpj" DESC'

            const result = await this.connection.query(sql, { nameCert, federalRegistration, endDateValidity })
            const clients: Certificate[] = result
            return clients
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'index', __filename, error)
        }
    }

    async getListCertificateNotOverdue (dto: FilterDto, tenant: string): Promise<{federalRegistration: string}[] | ErrorRequestResponse> {
        const { nameCert, endDateValidity, federalRegistration, hasProcurationEcac } = dto
        try {
            let sql = `
                SELECT certificate."federalRegistration"
                FROM "${tenant}".certificate AS certificate                
                WHERE certificate."endDateValidity" > now()
            `
            if (nameCert) sql = sql + 'AND certificate."nameCert" LIKE \'%\' || $<nameCert> || \'%\''
            if (federalRegistration) sql = sql + 'AND certificate."federalRegistration" = $<federalRegistration>'
            if (hasProcurationEcac && hasProcurationEcac === '1') sql = sql + 'AND certificate."hasProcurationEcac" = true'
            if (endDateValidity) sql = sql + 'AND DATE(certificate."endDateValidity") >= DATE($<endDateValidity>)'

            const result = await this.connection.query(sql, { nameCert, federalRegistration, endDateValidity })
            const clients: {federalRegistration: string}[] = result
            return clients
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'index', __filename, error)
        }
    }

    async indexToFront (dto: FilterDto, tenant: string): Promise<Certificate[] | ErrorRequestResponse> {
        const { nameCert, endDateValidity, federalRegistration, hasProcurationEcac, codeCompanies, statusCert, federalRegistrationPartial, _limit, _page } = dto
        try {
            let sql = `
                SELECT certificate.*, companie."codeCompanieAccountSystem", 
                       CASE WHEN companie."status" IS NULL THEN 'DONT_FIND' ELSE companie."status" END AS "statusCompanie",
                       CASE WHEN certificate."endDateValidity" < now() THEN 'OVERDUE' ELSE 'ACTIVE' END AS "statusCert"
                FROM "${tenant}".certificate AS certificate
                     LEFT JOIN "${tenant}".companie AS companie
                         ON    companie."federalRegistration" = certificate."federalRegistration"                  
                WHERE certificate."idCertificate" IS NOT NULL
            `
            if (nameCert) sql = sql + 'AND certificate."nameCert" LIKE \'%\' || $<nameCert> || \'%\''
            if (federalRegistration) sql = sql + 'AND certificate."federalRegistration" = $<federalRegistration>'
            if (federalRegistrationPartial) sql = sql + 'AND certificate."federalRegistration" LIKE \'%\' || $<federalRegistrationPartial> || \'%\''
            if (hasProcurationEcac && hasProcurationEcac === '1') sql = sql + 'AND certificate."hasProcurationEcac" = true'
            if (endDateValidity) sql = sql + 'AND DATE(certificate."endDateValidity") >= DATE($<endDateValidity>)'
            if (statusCert) sql = sql + 'AND CASE WHEN certificate."endDateValidity" < now() THEN \'OVERDUE\' ELSE \'ACTIVE\' END = $<statusCert>'
            if (codeCompanies) sql = sql + `\nAND companie."codeCompanieAccountSystem" IN (${codeCompanies})`

            sql = sql + '\nORDER BY certificate."nameCert"'

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
            const certificates: Certificate[] = result
            return certificates
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'index', __filename, error)
        }
    }

    async indexToFrontWithoutFilterPage (dto: FilterDto, tenant: string): Promise<{count: string} | ErrorRequestResponse> {
        const { nameCert, endDateValidity, federalRegistration, hasProcurationEcac, codeCompanies, statusCert, federalRegistrationPartial } = dto
        try {
            let sql = `
                SELECT COUNT(*)
                FROM "${tenant}".certificate AS certificate
                     LEFT JOIN "${tenant}".companie AS companie
                         ON    companie."federalRegistration" = certificate."federalRegistration"                  
                WHERE certificate."idCertificate" IS NOT NULL
            `
            if (nameCert) sql = sql + 'AND certificate."nameCert" LIKE \'%\' || $<nameCert> || \'%\''
            if (federalRegistration) sql = sql + 'AND certificate."federalRegistration" = $<federalRegistration>'
            if (federalRegistrationPartial) sql = sql + 'AND companie."federalRegistration" LIKE \'%\' || $<federalRegistrationPartial> || \'%\''
            if (hasProcurationEcac && hasProcurationEcac === '1') sql = sql + 'AND certificate."hasProcurationEcac" = true'
            if (endDateValidity) sql = sql + 'AND DATE(certificate."endDateValidity") >= DATE($<endDateValidity>)'
            if (statusCert) sql = sql + 'AND CASE WHEN certificate."endDateValidity" < now() THEN \'OVERDUE\' ELSE \'ACTIVE\' END = $<statusCert>'
            if (codeCompanies) sql = sql + `\nAND companie."codeCompanieAccountSystem" IN (${codeCompanies})`

            const result = await this.connection.one(sql, { ...dto })
            const certificates: {count: string} = result
            return certificates
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'index', __filename, error)
        }
    }

    async show (idCertificate: string, tenant: string): Promise<Certificate | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT certificate.*
                FROM "${tenant}".certificate AS certificate
                WHERE "idCertificate" = $<idCertificate>
            `
            const result = await this.connection.query(sql, { idCertificate })
            if (!result || result.length === 0) throw new NotFoundException(`Certificate with ID ${idCertificate} not found`)
            const client: Certificate = result[0]
            return client
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'show', __filename, error)
        }
    }

    async store (certificate: Certificate, tenant: string): Promise<Pick<Certificate, 'idCertificate'> | ErrorRequestResponse> {
        try {
            const sql = `
                INSERT INTO "${tenant}".certificate("idCertificate", "createdAt", "updatedAt", "password", "commomName", 
                            "startDateValidity", "endDateValidity", "nameCert", "federalRegistration", "eCpfCnpj", "urlSaved")
                VALUES ($<idCertificate>, $<createdAt>, $<updatedAt>, $<password>, $<commomName>, $<startDateValidity>,
                        $<endDateValidity>, $<nameCert>, $<federalRegistration>, $<eCpfCnpj>, $<urlSaved>)
                RETURNING "idCertificate"
            `
            const result = await this.connection.one(sql, { ...certificate })
            return result
        } catch (error) {
            console.log({ tenant, ...certificate })
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'store', __filename, error)
        }
    }

    async update (certificate: Certificate, tenant: string): Promise<void | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE "${tenant}".certificate
                SET "updatedAt" = $<updatedAt>, "password" = $<password>, "commomName" = $<commomName>,
                    "startDateValidity" = $<startDateValidity>, "endDateValidity" = $<endDateValidity>,
                    "nameCert" = $<nameCert>, "federalRegistration" = $<federalRegistration>, "eCpfCnpj" = $<eCpfCnpj>,
                    "urlSaved" = $<urlSaved>, "hasProcurationEcac" = $<hasProcurationEcac>
                WHERE "idCertificate" = $<idCertificate>
            `
            await this.connection.result(sql, { ...certificate })
        } catch (error) {
            console.log({ tenant, ...certificate })
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'update', __filename, error)
        }
    }

    async destroy (idCertificate: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const sql = `
                DELETE
                FROM "${tenant}".certificate AS certificate
                WHERE certificate."idCertificate" = $<idCertificate>
            `
            const result = await this.connection.result(sql, { idCertificate })
            if (result.rowCount) {
                return MakeDeleteResult(`${tenant}.certificate`, idCertificate)
            }
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.certificate`, 'destroy', __filename, error)
        }
    }
}