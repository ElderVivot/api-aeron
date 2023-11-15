import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { Connection } from '@database/connection'
import { NotFoundException, Inject } from '@nestjs/common'

import { Companie } from '../companie/companie.entity'
import { FilterDto } from './dto/filter.dto'
import { LogNotaFiscal } from './log-nota-fiscal.entity'

export class LogNotaFiscalRepository {
    constructor (@Inject('CONNECTION') private connection: Connection) { }

    async index (dto: FilterDto, tenant: string): Promise<LogNotaFiscal[] | ErrorRequestResponse> {
        const {
            idCompanie, modelNotaFiscal, situationNotaFiscal, dateStartDown, dateEndDown, typeLog, dateStartDownBetween,
            dateEndDownBetween, federalRegistration, codeCompanieAccountSystem, nameCompanie, typeSearch
        } = dto
        try {
            let sql = `
                SELECT log_nota_fiscal.*,
                       companie."idCompanie", companie."name", companie."federalRegistration", 
                       companie."stateRegistration", companie."codeCompanieAccountSystem", companie."cnaes",
                       companie."dateInicialAsClient", companie."dateFinalAsClient", companie."taxRegime", companie.status AS "statusCompanie",
                       city.name AS "nameCity", state.acronym AS "stateCity",
                       certificate."urlSaved" AS "urlCert", certificate."endDateValidity" AS "endDateValidityCert", certificate."eCpfCnpj" AS "eCpfCnpjCert",
                       certificate."idCertificate", certificate."commomName" AS "commomNameCert"
                       
                FROM "${tenant}".log_nota_fiscal AS log_nota_fiscal
                     INNER JOIN "${tenant}".companie AS companie ON companie."idCompanie" = log_nota_fiscal."idCompanie"
                     INNER JOIN public.city AS city ON city.id_city = companie."idCity"
                     INNER JOIN public.state AS state ON state.id_state = city.id_state
                     LEFT JOIN "${tenant}".certificate as certificate ON LEFT(certificate."federalRegistration", 8) = LEFT(companie."federalRegistration", 8)
                WHERE log_nota_fiscal."idLogNotaFiscal" IS NOT NULL
                  AND ( certificate."idCertificate" IS NULL OR
                     certificate."endDateValidity" = ( SELECT MAX(certificate2."endDateValidity")
                                                FROM "${tenant}".certificate AS certificate2 
                                                WHERE LEFT(certificate2."federalRegistration", 8) = LEFT(certificate."federalRegistration", 8)
                                            )
                )
            `
            if (typeLog) sql = sql + '\nAND log_nota_fiscal."typeLog" = $<typeLog>'
            if (idCompanie) sql = sql + '\nAND log_nota_fiscal."idCompanie" = $<idCompanie>'
            if (modelNotaFiscal) sql = sql + '\nAND log_nota_fiscal."modelNotaFiscal" = $<modelNotaFiscal>'
            if (typeSearch) sql = sql + '\nAND log_nota_fiscal."typeSearch" = $<typeSearch>'
            if (situationNotaFiscal) sql = sql + '\nAND log_nota_fiscal."situationNotaFiscal" = $<situationNotaFiscal>'
            if (dateStartDown) sql = sql + '\nAND DATE(log_nota_fiscal."dateStartDown") = DATE($<dateStartDown>)'
            if (dateEndDown) sql = sql + '\nAND DATE(log_nota_fiscal."dateEndDown") = DATE($<dateEndDown>)'
            if (dateStartDownBetween) sql = sql + '\nAND DATE(log_nota_fiscal."dateStartDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)'
            if (dateEndDownBetween) sql = sql + '\nAND DATE(log_nota_fiscal."dateEndDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)'
            if (federalRegistration) sql = sql + '\nAND companie."federalRegistration" = $<federalRegistration>'
            if (codeCompanieAccountSystem) sql = sql + '\nAND companie."codeCompanieAccountSystem" = $<codeCompanieAccountSystem>'
            if (nameCompanie) sql = sql + '\nAND companie."name" LIKE \'%\' || $<nameCompanie> || \'%\''

            sql = sql + '\nORDER BY log_nota_fiscal."idCompanie", log_nota_fiscal."modelNotaFiscal", log_nota_fiscal."situationNotaFiscal", log_nota_fiscal."dateStartDown", log_nota_fiscal."dateEndDown"'

            const result: LogNotaFiscal[] = await this.connection.query(sql,
                { ...dto }
            )
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nota_fiscal`, 'index', __filename, error)
        }
    }

    async indexToFront (dto: FilterDto, tenant: string): Promise<LogNotaFiscal[] | ErrorRequestResponse> {
        const {
            _page, _limit, idCompanie, modelNotaFiscal, situationNotaFiscal, dateStartDown, dateEndDown, typeLog,
            dateStartDownBetween, dateEndDownBetween, codeCompanies, federalRegistration, codeCompanieAccountSystem, competence, nameCompanie
        } = dto
        try {
            let sql = `
                SELECT companie."codeCompanieAccountSystem", companie."name" AS "nameCompanie", companie."federalRegistration", 
                       log_nota_fiscal."modelNotaFiscal", log_nota_fiscal."situationNotaFiscal", log_nota_fiscal."updatedAt",
                       log_nota_fiscal."typeLog", log_nota_fiscal."dateStartDown", log_nota_fiscal."dateEndDown",
                       log_nota_fiscal."qtdNotesDown", log_nota_fiscal."messageLogToShowUser", log_nota_fiscal."urlPrintLog"
                FROM "${tenant}".log_nota_fiscal AS log_nota_fiscal
                     INNER JOIN "${tenant}".companie AS companie ON companie."idCompanie" = log_nota_fiscal."idCompanie"
                WHERE log_nota_fiscal."idLogNotaFiscal" IS NOT NULL
            `
            if (typeLog) sql = sql + '\nAND log_nota_fiscal."typeLog" = $<typeLog>'
            if (idCompanie) sql = sql + '\nAND log_nota_fiscal."idCompanie" = $<idCompanie>'
            if (modelNotaFiscal) sql = sql + '\nAND log_nota_fiscal."modelNotaFiscal" = $<modelNotaFiscal>'
            if (situationNotaFiscal) sql = sql + '\nAND log_nota_fiscal."situationNotaFiscal" = $<situationNotaFiscal>'
            if (dateStartDown) sql = sql + '\nAND DATE(log_nota_fiscal."dateStartDown") = DATE($<dateStartDown>)'
            if (dateEndDown) sql = sql + '\nAND DATE(log_nota_fiscal."dateEndDown") = DATE($<dateEndDown>)'
            if (dateStartDownBetween) sql = sql + '\nAND DATE(log_nota_fiscal."dateStartDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)'
            if (dateEndDownBetween) sql = sql + '\nAND DATE(log_nota_fiscal."dateEndDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)'
            if (codeCompanies) sql = sql + `\nAND companie."codeCompanieAccountSystem" IN (${codeCompanies})`
            if (nameCompanie) sql = sql + '\nAND companie."name" LIKE \'%\' || $<nameCompanie> || \'%\''
            if (federalRegistration) sql = sql + '\nAND companie."federalRegistration" = $<federalRegistration>'
            if (codeCompanieAccountSystem) sql = sql + '\nAND companie."codeCompanieAccountSystem" = $<codeCompanieAccountSystem>'
            if (competence) {
                sql = sql + `
                    AND EXTRACT(MONTH FROM log_nota_fiscal."dateStartDown") = EXTRACT( MONTH FROM DATE($<competence>) )
                    AND EXTRACT(YEAR FROM log_nota_fiscal."dateStartDown") = EXTRACT( YEAR FROM DATE($<competence>) )
                `
            }

            sql = sql + '\nORDER BY TO_NUMBER(companie."codeCompanieAccountSystem", \'9999999999\'), log_nota_fiscal."dateStartDown", log_nota_fiscal."dateEndDown", log_nota_fiscal."modelNotaFiscal", log_nota_fiscal."situationNotaFiscal"'

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
            const result: LogNotaFiscal[] = await this.connection.query(sql,
                { ...dto, _offset }
            )
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nota_fiscal`, 'indexToFront', __filename, error)
        }
    }

    async indexToFrontCountWithoutFilterPage (dto: FilterDto, tenant: string): Promise<{count: string} | ErrorRequestResponse> {
        const {
            idCompanie, modelNotaFiscal, situationNotaFiscal, dateStartDown, dateEndDown, typeLog,
            dateStartDownBetween, dateEndDownBetween, codeCompanies, federalRegistration, codeCompanieAccountSystem, competence, nameCompanie
        } = dto
        try {
            let sql = `
                SELECT COUNT(1)
                  FROM "${tenant}".log_nota_fiscal AS log_nota_fiscal
                       INNER JOIN "${tenant}".companie AS companie ON companie."idCompanie" = log_nota_fiscal."idCompanie"
                WHERE log_nota_fiscal."idLogNotaFiscal" IS NOT NULL
            `
            if (typeLog) sql = sql + '\nAND log_nota_fiscal."typeLog" = $<typeLog>'
            if (idCompanie) sql = sql + '\nAND log_nota_fiscal."idCompanie" = $<idCompanie>'
            if (modelNotaFiscal) sql = sql + '\nAND log_nota_fiscal."modelNotaFiscal" = $<modelNotaFiscal>'
            if (situationNotaFiscal) sql = sql + '\nAND log_nota_fiscal."situationNotaFiscal" = $<situationNotaFiscal>'
            if (dateStartDown) sql = sql + '\nAND DATE(log_nota_fiscal."dateStartDown") = DATE($<dateStartDown>)'
            if (dateEndDown) sql = sql + '\nAND DATE(log_nota_fiscal."dateEndDown") = DATE($<dateEndDown>)'
            if (dateStartDownBetween) sql = sql + '\nAND DATE(log_nota_fiscal."dateStartDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)'
            if (dateEndDownBetween) sql = sql + '\nAND DATE(log_nota_fiscal."dateEndDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)'
            if (codeCompanies) sql = sql + `\nAND companie."codeCompanieAccountSystem" IN (${codeCompanies})`
            if (federalRegistration) sql = sql + '\nAND companie."federalRegistration" = $<federalRegistration>'
            if (codeCompanieAccountSystem) sql = sql + '\nAND companie."codeCompanieAccountSystem" = $<codeCompanieAccountSystem>'
            if (nameCompanie) sql = sql + '\nAND companie."name" LIKE \'%\' || $<nameCompanie> || \'%\''
            if (competence) {
                sql = sql + `
                    AND EXTRACT(MONTH FROM log_nota_fiscal."dateStartDown") = EXTRACT( MONTH FROM DATE($<competence>) )
                    AND EXTRACT(YEAR FROM log_nota_fiscal."dateStartDown") = EXTRACT( YEAR FROM DATE($<competence>) )
                `
            }

            const result: {count: string} = await this.connection.one(sql,
                { ...dto }
            )
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nota_fiscal`, 'indexToFrontCountWithoutFilterPage', __filename, error)
        }
    }

    async show (idLogNotaFiscal: string, tenant: string): Promise<LogNotaFiscal | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT log_nota_fiscal.*
                FROM "${tenant}".log_nota_fiscal AS log_nota_fiscal
                WHERE "idLogNotaFiscal" = $<idLogNotaFiscal>
            `
            const result = await this.connection.query(sql, { idLogNotaFiscal })
            if (!result || result.length === 0) throw new NotFoundException(`LogNotaFiscal with ID ${idLogNotaFiscal} not found`)
            const client: LogNotaFiscal = result[0]
            return client
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nota_fiscal`, 'show', __filename, error)
        }
    }

    async store (logNotaFiscal: LogNotaFiscal, tenant: string): Promise<Pick<LogNotaFiscal, 'idLogNotaFiscal'> | ErrorRequestResponse> {
        try {
            const sql = `
                INSERT INTO "${tenant}".log_nota_fiscal("idLogNotaFiscal", "idCompanie", "createdAt", "updatedAt", 
                       "modelNotaFiscal", "situationNotaFiscal", "dateStartDown", "dateEndDown", "typeLog", "messageLog", "messageLogToShowUser", 
                       "wayCertificate", "messageError", "qtdNotesDown", "qtdTimesReprocessed", "pageInicial", "pageFinal", "qtdPagesTotal", "urlPrintLog", "typeSearch")
                VALUES ($<idLogNotaFiscal>, $<idCompanie>, $<createdAt>, $<updatedAt>, $<modelNotaFiscal>, $<situationNotaFiscal>,
                        $<dateStartDown>, $<dateEndDown>, $<typeLog>, $<messageLog>, $<messageLogToShowUser>, $<wayCertificate>, $<messageError>,
                        $<qtdNotesDown>, $<qtdTimesReprocessed>, $<pageInicial>, $<pageFinal>, $<qtdPagesTotal>, $<urlPrintLog>, $<typeSearch>)
                RETURNING "idLogNotaFiscal"
            `
            const result = await this.connection.one(sql, { ...logNotaFiscal })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nota_fiscal`, 'store', __filename, error)
        }
    }

    async update (logNotaFiscal: LogNotaFiscal, tenant: string): Promise<void | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE "${tenant}".log_nota_fiscal
                SET "updatedAt" = $<updatedAt>, "modelNotaFiscal" = $<modelNotaFiscal>, "situationNotaFiscal" = $<situationNotaFiscal>, 
                    "dateStartDown" = $<dateStartDown>, "dateEndDown" = $<dateEndDown>, "typeLog" = $<typeLog>, "messageLog" = $<messageLog>,
                    "messageLogToShowUser" = $<messageLogToShowUser>, "wayCertificate" = $<wayCertificate>, "messageError" = $<messageError>, 
                    "qtdNotesDown" = $<qtdNotesDown>, "qtdTimesReprocessed" = $<qtdTimesReprocessed>, "pageInicial" = $<pageInicial>, 
                    "pageFinal" = $<pageFinal>, "qtdPagesTotal" = $<qtdPagesTotal>, "urlPrintLog" = $<urlPrintLog>, "typeSearch" = $<typeSearch>
                WHERE "idLogNotaFiscal" = $<idLogNotaFiscal>
            `
            await this.connection.result(sql, { ...logNotaFiscal })
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nota_fiscal`, 'update', __filename, error)
        }
    }

    async updateUrlPrintLog (idLogNotaFiscal: string, urlPrintLog: string, tenant: string): Promise<void | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE "${tenant}".log_nota_fiscal
                SET "urlPrintLog" = $<urlPrintLog>
                WHERE "idLogNotaFiscal" = $<idLogNotaFiscal>
            `
            await this.connection.result(sql, { idLogNotaFiscal, urlPrintLog })
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nota_fiscal`, 'updateUrlPrintLog', __filename, error)
        }
    }

    async getCompaniesThatDontProcessNotaFiscalYet (dto: FilterDto, tenant: string): Promise<Companie[] | ErrorRequestResponse> {
        const {
            idCompanie, typeLog, federalRegistration, codeCompanieAccountSystem, typeFederalRegistration, idCompanieList
        } = dto
        try {
            let sql = `
                SELECT companie."idCompanie", companie."name", companie."federalRegistration", 
                        companie."stateRegistration", companie."codeCompanieAccountSystem", companie."cnaes",
                        companie."dateInicialAsClient", companie."dateFinalAsClient", companie."taxRegime",
                        city.name AS "nameCity", state.acronym AS "stateCity",
                       certificate."urlSaved" AS "urlCert", certificate."endDateValidity" AS "endDateValidityCert", certificate."eCpfCnpj" AS "eCpfCnpjCert",
                       certificate."idCertificate", certificate."commomName" AS "commomNameCert",
                       log_nota_fiscal."dateEndDown" as "dateEndDown"

                FROM "${tenant}".companie AS companie
                     INNER JOIN public.city AS city ON city.id_city = companie."idCity"
                     INNER JOIN public.state AS state ON state.id_state = city.id_state
                     LEFT JOIN "${tenant}".certificate as certificate ON LEFT(certificate."federalRegistration", 8) = LEFT(companie."federalRegistration", 8)
                     LEFT JOIN "${tenant}".log_nota_fiscal AS log_nota_fiscal
                          ON    log_nota_fiscal."idCompanie" = companie."idCompanie"
                            AND log_nota_fiscal."modelNotaFiscal" = $<modelNotaFiscal>
                            AND log_nota_fiscal."situationNotaFiscal" = $<situationNotaFiscal>
                            AND log_nota_fiscal."typeSearch" = $<typeSearch>
                            AND DATE(log_nota_fiscal."dateStartDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)
                            AND DATE(log_nota_fiscal."dateEndDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)
                
                WHERE companie."idCompanie" IN (${idCompanieList})
                  AND companie."typeFederalRegistration" = 'cnpj'
                  AND companie.status = 'ACTIVE'
                  AND ( 
                    log_nota_fiscal."idLogNotaFiscal" IS NULL OR
                    log_nota_fiscal."dateStartDown" = ( SELECT MAX(log_nota_fiscal_2."dateStartDown")
                                                          FROM "${tenant}".log_nota_fiscal AS log_nota_fiscal_2
                                                         WHERE log_nota_fiscal_2."idCompanie" = log_nota_fiscal."idCompanie"
                                                           AND log_nota_fiscal_2."modelNotaFiscal" = log_nota_fiscal."modelNotaFiscal"
                                                           AND log_nota_fiscal_2."situationNotaFiscal" = log_nota_fiscal."situationNotaFiscal"
                                                           AND log_nota_fiscal_2."typeSearch" = log_nota_fiscal."typeSearch"
                                                           AND DATE(log_nota_fiscal_2."dateStartDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)
                                                           AND DATE(log_nota_fiscal_2."dateEndDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>) 
                                                       )
                      )
                  AND ( certificate."idCertificate" IS NULL OR
                        certificate."endDateValidity" = ( SELECT MAX(certificate2."endDateValidity")
                                                     FROM "${tenant}".certificate AS certificate2 
                                                    WHERE LEFT(certificate2."federalRegistration", 8) = LEFT(certificate."federalRegistration", 8)
                                                  )
                      )
            `
            if (typeLog) sql = sql + '\nAND log_nota_fiscal."typeLog" = $<typeLog>'
            if (idCompanie) sql = sql + '\nAND log_nota_fiscal."idCompanie" = $<idCompanie>'
            if (federalRegistration) sql = sql + '\nAND companie."federalRegistration" = $<federalRegistration>'
            if (typeFederalRegistration) sql = sql + 'AND companie."typeFederalRegistration" = $<typeFederalRegistration>'
            if (codeCompanieAccountSystem) sql = sql + '\nAND companie."codeCompanieAccountSystem" = $<codeCompanieAccountSystem>'

            sql = sql + 'ORDER BY TO_NUMBER(companie."codeCompanieAccountSystem", \'9999999999\')'

            const result: Companie[] = await this.connection.query(sql,
                { ...dto }
            )
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2(`${tenant}.log_nota_fiscal`, 'index', __filename, error)
        }
    }
}