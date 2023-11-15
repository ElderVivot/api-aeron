/* eslint-disable camelcase */
import { MakeDeleteResult } from '@common/factories/make-deleted-success'
import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { Connection } from '@database/connection'
import { NotFoundException, Inject } from '@nestjs/common'

import { Companie } from './companie.entity'
import { FilterDto } from './dto/filter.dto'

export class CompanieRepository {
    constructor (@Inject('CONNECTION') private connection: Connection) { }

    async index (dto: FilterDto, tenant: string): Promise<Companie[] | ErrorRequestResponse> {
        const {
            _page, _limit, name, status, federalRegistration, federalRegistrationPartial, cityRegistration,
            idRoutine, codeCompanies, typeFederalRegistration, existEmployees
        } = dto
        const codeCompanieAccountSystem = dto.codeCompanieAccountSystem ? dto.codeCompanieAccountSystem.toString() : ''
        try {
            let sql = `
                SELECT companie.*, city.name AS "nameCity", state.acronym AS "stateCity",
                       certificate."urlSaved" AS "urlCert", certificate."endDateValidity" AS "endDateValidityCert", certificate."eCpfCnpj" AS "eCpfCnpjCert"
                FROM "${tenant}".companie AS companie
                     INNER JOIN public.city AS city ON city.id_city = companie."idCity"
                     INNER JOIN public.state AS state ON state.id_state = city.id_state
                     LEFT JOIN "${tenant}".certificate as certificate ON LEFT(certificate."federalRegistration", 8) = LEFT(companie."federalRegistration", 8)
                WHERE companie."idCompanie" IS NOT NULL
                  AND ( certificate."idCertificate" IS NULL OR
                        certificate."endDateValidity" = ( SELECT MAX(certificate2."endDateValidity")
                                                     FROM "${tenant}".certificate AS certificate2 
                                                    WHERE LEFT(certificate2."federalRegistration", 8) = LEFT(certificate."federalRegistration", 8)
                                                  )
                      )  
            `
            if (name) sql = sql + 'AND companie."name" LIKE \'%\' || $<name> || \'%\''
            if (status) sql = sql + 'AND companie."status" = $<status>'
            if (typeFederalRegistration) sql = sql + 'AND companie."typeFederalRegistration" = $<typeFederalRegistration>'
            if (federalRegistration) sql = sql + 'AND companie."federalRegistration" = $<federalRegistration>'
            if (federalRegistrationPartial) sql = sql + 'AND companie."federalRegistration" LIKE \'%\' || $<federalRegistrationPartial> || \'%\''
            if (codeCompanieAccountSystem) sql = sql + 'AND companie."codeCompanieAccountSystem" = $<codeCompanieAccountSystem>'
            if (cityRegistration) sql = sql + 'AND companie."cityRegistration" = $<cityRegistration>'
            if (codeCompanies) sql = sql + `\nAND companie."codeCompanieAccountSystem" IN (${codeCompanies})`

            if (idRoutine) {
                sql = sql + `AND NOT EXISTS ( SELECT 1 
                                                FROM "${tenant}".companies_routines AS companies_routines 
                                               WHERE companies_routines."idCompanie" = companie."idCompanie"
                                                 AND companies_routines."idRoutine" = $<idRoutine> )`
            }

            let todayString = ''
            if (existEmployees) {
                const today = new Date()
                today.setDate(1)
                todayString = today.toISOString().substring(0, 10)
                sql = sql + `AND EXISTS ( 
                  SELECT 1 
                    FROM "${tenant}".employee AS employee 
                   WHERE employee."idCompanie" = companie."idCompanie"
                     AND employee."typeEmployee" = 1
                     AND ( DATE(employee.resignation) >= DATE($<todayString>) OR employee.resignation IS NULL )
                     AND ( employee."esocialHas2220" = 0 OR employee."esocialHas2240" = 0 )
                )`
            }

            sql = sql + 'ORDER BY TO_NUMBER(companie."codeCompanieAccountSystem", \'9999999999\')'

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

            const result = await this.connection.query(sql, { ...dto, _offset, todayString })
            const clients: Companie[] = result
            return clients
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'index', __filename, error)
        }
    }

    async indexCountWithoutFilterPage (dto: FilterDto, tenant: string): Promise<{count: string} | ErrorRequestResponse> {
        const {
            name, status, federalRegistration, cityRegistration, codeCompanies, federalRegistrationPartial,
            idRoutine, typeFederalRegistration, existEmployees
        } = dto
        const codeCompanieAccountSystem = dto.codeCompanieAccountSystem ? dto.codeCompanieAccountSystem.toString() : ''
        try {
            let sql = `
                SELECT COUNT(1)
                FROM "${tenant}".companie AS companie
                     INNER JOIN public.city AS city ON city.id_city = companie."idCity"                 
                     INNER JOIN public.state AS state ON state.id_state = city.id_state
                     LEFT JOIN "${tenant}".certificate as certificate ON LEFT(certificate."federalRegistration", 8) = LEFT(companie."federalRegistration", 8)                
                WHERE companie."idCompanie" IS NOT NULL
                  AND ( certificate."idCertificate" IS NULL OR
                        certificate."updatedAt" = ( SELECT MAX(certificate2."updatedAt")
                                                     FROM "${tenant}".certificate AS certificate2 
                                                    WHERE LEFT(certificate2."federalRegistration", 8) = LEFT(certificate."federalRegistration", 8)
                                                      AND DATE(certificate2."endDateValidity") > DATE(CURRENT_DATE)
                                                  )
                      )  
            `
            if (name) sql = sql + 'AND companie."name" LIKE \'%\' || $<name> || \'%\''
            if (status) sql = sql + 'AND companie."status" = $<status>'
            if (typeFederalRegistration) sql = sql + 'AND companie."typeFederalRegistration" = $<typeFederalRegistration>'
            if (federalRegistration) sql = sql + 'AND companie."federalRegistration" = $<federalRegistration>'
            if (federalRegistrationPartial) sql = sql + 'AND companie."federalRegistration" LIKE \'%\' || $<federalRegistrationPartial> || \'%\''
            if (codeCompanieAccountSystem) sql = sql + 'AND companie."codeCompanieAccountSystem" = $<codeCompanieAccountSystem>'
            if (cityRegistration) sql = sql + 'AND companie."cityRegistration" = $<cityRegistration>'
            if (codeCompanies) sql = sql + `\nAND companie."codeCompanieAccountSystem" IN (${codeCompanies})`

            if (idRoutine) {
                sql = sql + `AND NOT EXISTS ( SELECT 1 
                                                FROM "${tenant}".companies_routines AS companies_routines 
                                               WHERE companies_routines."idCompanie" = companie."idCompanie"
                                                 AND companies_routines."idRoutine" = $<idRoutine> )`
            }

            let todayString = ''
            if (existEmployees) {
                const today = new Date()
                today.setDate(1)
                todayString = today.toISOString().substring(0, 10)
                sql = sql + `AND EXISTS ( 
                  SELECT 1 
                    FROM "${tenant}".employee AS employee 
                   WHERE employee."idCompanie" = companie."idCompanie"
                     AND employee."typeEmployee" = 1
                     AND ( DATE(employee.resignation) >= DATE($<todayString>) OR employee.resignation IS NULL )
                     AND ( employee."esocialHas2220" = 0 OR employee."esocialHas2240" = 0 )
                )`
            }

            const result = await this.connection.one(sql, { ...dto, todayString })
            const data: {count: string} = result
            return data
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'index', __filename, error)
        }
    }

    async indexOnlyIDCompanie (dto: FilterDto, tenant: string): Promise<Companie[] | ErrorRequestResponse> {
        const { _page, _limit, name, status, federalRegistration, federalRegistrationPartial, cityRegistration, codeCompanies, typeFederalRegistration } = dto
        const codeCompanieAccountSystem = dto.codeCompanieAccountSystem ? dto.codeCompanieAccountSystem.toString() : ''
        try {
            let sql = `
                SELECT companie."idCompanie"
                  FROM "${tenant}".companie AS companie
                     INNER JOIN public.city AS city ON city.id_city = companie."idCity"
                     INNER JOIN public.state AS state ON state.id_state = city.id_state
                WHERE companie."idCompanie" IS NOT NULL
            `
            if (name) sql = sql + 'AND companie."name" LIKE \'%\' || $<name> || \'%\''
            if (status) sql = sql + 'AND companie."status" = $<status>'
            if (typeFederalRegistration) sql = sql + 'AND companie."typeFederalRegistration" = $<typeFederalRegistration>'
            if (federalRegistration) sql = sql + 'AND companie."federalRegistration" = $<federalRegistration>'
            if (federalRegistrationPartial) sql = sql + 'AND companie."federalRegistration" LIKE \'%\' || $<federalRegistrationPartial> || \'%\''
            if (codeCompanieAccountSystem) sql = sql + 'AND companie."codeCompanieAccountSystem" = $<codeCompanieAccountSystem>'
            if (cityRegistration) sql = sql + 'AND companie."cityRegistration" = $<cityRegistration>'
            if (codeCompanies) sql = sql + `\nAND companie."codeCompanieAccountSystem" IN (${codeCompanies})`

            sql = sql + 'ORDER BY TO_NUMBER(companie."codeCompanieAccountSystem", \'9999999999\')'

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
            const clients: Companie[] = result
            return clients
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'index', __filename, error)
        }
    }

    async indexOnlyIDCompanieCount (dto: FilterDto, tenant: string): Promise<{count: string} | ErrorRequestResponse> {
        const { name, status, federalRegistration, cityRegistration, typeFederalRegistration } = dto
        const codeCompanieAccountSystem = dto.codeCompanieAccountSystem ? dto.codeCompanieAccountSystem.toString() : ''
        try {
            let sql = `
            SELECT COUNT(1)
            FROM "${tenant}".companie AS companie
               INNER JOIN public.city AS city ON city.id_city = companie."idCity"
               INNER JOIN public.state AS state ON state.id_state = city.id_state
          WHERE companie."idCompanie" IS NOT NULL
            `
            if (name) sql = sql + 'AND companie."name" LIKE \'%\' || $<name> || \'%\''
            if (status) sql = sql + 'AND companie."status" = $<status>'
            if (typeFederalRegistration) sql = sql + 'AND companie."typeFederalRegistration" = $<typeFederalRegistration>'
            if (federalRegistration) sql = sql + 'AND companie."federalRegistration" = $<federalRegistration>'
            if (codeCompanieAccountSystem) sql = sql + 'AND companie."codeCompanieAccountSystem" = $<codeCompanieAccountSystem>'
            if (cityRegistration) sql = sql + 'AND companie."cityRegistration" = $<cityRegistration>'

            const result = await this.connection.one(sql, { ...dto })
            const data: {count: string} = result
            return data
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'index', __filename, error)
        }
    }

    async show (idCompanie: string, tenant: string): Promise<Companie | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT companie.*, city.name AS "nameCity", state.acronym AS "stateCity",
                       certificate."urlSaved" AS "urlCert", certificate."endDateValidity" AS "endDateValidityCert", certificate."idCertificate",
                       certificate."commomName" AS "commomNameCert"
                  FROM "${tenant}".companie AS companie
                       INNER JOIN public.city AS city ON city.id_city = companie."idCity"                 
                       INNER JOIN public.state AS state ON state.id_state = city.id_state
                       LEFT JOIN "${tenant}".certificate as certificate ON LEFT(certificate."federalRegistration", 8) = LEFT(companie."federalRegistration", 8)     
                 WHERE "idCompanie" = $<idCompanie>
            `
            const result = await this.connection.query(sql, { idCompanie })
            if (!result || result.length === 0) throw new NotFoundException(`Companie with ID ${idCompanie} not found`)
            const client: Companie = result[0]
            return client
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'show', __filename, error)
        }
    }

    async store (companie: Companie, tenant: string): Promise<Pick<Companie, 'idCompanie'> | ErrorRequestResponse> {
        try {
            const sql = `
                INSERT INTO "${tenant}".companie("idCompanie", "createdAt", "updatedAt", "codeCompanieAccountSystem", "name", 
                            "nickName", "typeFederalRegistration", "federalRegistration", "stateRegistration", "cityRegistration", "status",
                            "dddPhone", "phone", "email", "neighborhood", "street", "zipCode", "complement", "referency", "dateInicialAsCompanie", 
                            "dateInicialAsClient", "dateFinalAsClient", "cnaes", "taxRegime", "idCity")
                VALUES ($<idCompanie>, $<createdAt>, $<updatedAt>, $<codeCompanieAccountSystem>, $<name>, $<nickName>, $<typeFederalRegistration>,  
                        $<federalRegistration>, $<stateRegistration>, $<cityRegistration>, $<status>, $<dddPhone>, $<phone>, $<email>,
                        $<neighborhood>, $<street>, $<zipCode>, $<complement>, $<referency>, $<dateInicialAsCompanie>, $<dateInicialAsClient>, 
                        $<dateFinalAsClient>, $<cnaes>, $<taxRegime>, $<idCity>)
                RETURNING "idCompanie"
            `
            const result = await this.connection.one(sql, { ...companie })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'store', __filename, error)
        }
    }

    async update (companie: Companie, tenant: string): Promise<void | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE "${tenant}".companie
                SET "updatedAt" = $<updatedAt>, "codeCompanieAccountSystem" = $<codeCompanieAccountSystem>, "name" = $<name>, 
                    "nickName" = $<nickName>, "typeFederalRegistration" = $<typeFederalRegistration>,  
                    "federalRegistration" = $<federalRegistration>, "stateRegistration" = $<stateRegistration>,  
                    "cityRegistration" = $<cityRegistration>, "status" = $<status>, "dddPhone" = $<dddPhone>, "phone" = $<phone>, 
                    "email" = $<email>, "neighborhood" = $<neighborhood>, "street" = $<street>, "zipCode" = $<zipCode>, 
                    "complement" = $<complement>, "referency" = $<referency>,  "dateInicialAsCompanie" = $<dateInicialAsCompanie>, 
                    "dateInicialAsClient" = $<dateInicialAsClient>, "dateFinalAsClient" = $<dateFinalAsClient>, "cnaes" = $<cnaes>, 
                    "taxRegime" = $<taxRegime>, "idCity" = $<idCity>
                WHERE "idCompanie" = $<idCompanie>
            `
            await this.connection.result(sql, { ...companie })
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'update', __filename, error)
        }
    }

    async destroy (idCompanie: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const sql = `
                DELETE
                FROM "${tenant}".companie AS companie                     
                WHERE companie."idCompanie" = $<idCompanie>
            `
            const result = await this.connection.result(sql, { idCompanie })
            if (result.rowCount) {
                return MakeDeleteResult(`${tenant}.companie`, idCompanie)
            }
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.companie`, 'destroy', __filename, error)
        }
    }
}