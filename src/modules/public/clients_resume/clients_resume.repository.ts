import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { Connection } from '@database/connection'
import { Inject } from '@nestjs/common'

interface ITypeLogResult {
    success: number
    warning: number
    to_process: number
    processing: number
    error: number
    total: number
    lastUpdatedSuccess: Date
}

export class ClientsResumeRepository {
    constructor (@Inject('CONNECTION') private connection: Connection) { }

    async getDataCompanies (tenant: string, competence: string): Promise<{qtd} | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT COUNT(1) AS "qtd"

                  FROM "${tenant}".companie AS c

                 WHERE DATE(c."dateInicialAsClient") <= DATE($<competence>)
                   AND ( c."dateFinalAsClient" IS NULL OR DATE(c."dateFinalAsClient") > DATE($<competence>) )
            `

            const result = await this.connection.query(sql, { competence })
            const data: {qtd} = result[0]
            return data
        } catch (error) {
            return MakeErrorRequestResponseV2('public.clients_resume', 'getDataFromLogNotaNFsGYN', __filename, error)
        }
    }

    async getQtdRecordsInAnyTable (tenant: string, tableName: string): Promise<{qtd} | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT COUNT(1) AS "qtd"

                  FROM "${tenant}"."${tableName}" AS c
            `

            const result = await this.connection.query(sql, { })
            const data: {qtd} = result[0]
            return data
        } catch (error) {
            return MakeErrorRequestResponseV2('public.clients_resume', 'getQtdRecordsInAnyTable', __filename, error)
        }
    }

    async getDataFromLogNotaFiscalGO (tenant: string, competence: string): Promise<ITypeLogResult| ErrorRequestResponse> {
        try {
            const sql = `
                SELECT COALESCE( SUM(CASE WHEN log."typeLog" = 'success' THEN 1 ELSE 0 END), 0 ) AS "success",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'to_process' THEN 1 ELSE 0 END), 0 ) AS "to_process",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'error' THEN 1 ELSE 0 END), 0 ) AS "error",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'warning' THEN 1 ELSE 0 END), 0 ) AS "warning",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'processing' THEN 1 ELSE 0 END), 0 ) AS "processing",
                       COALESCE( SUM(1), 0 ) AS "total",
                       COALESCE( MAX(CASE WHEN log."typeLog" = 'success' THEN log."updatedAt" ELSE NULL END) ) AS "lastUpdatedSuccess"

                  FROM "${tenant}".log_nota_fiscal AS log
                 WHERE EXTRACT(MONTH FROM log."dateStartDown") = EXTRACT( MONTH FROM DATE($<competence>) )
                   AND EXTRACT(YEAR FROM log."dateStartDown") = EXTRACT( YEAR FROM DATE($<competence>) )
            `

            const result = await this.connection.query(sql, { competence })
            const data: ITypeLogResult = result[0]
            return data
        } catch (error) {
            return MakeErrorRequestResponseV2('public.clients_resume', 'getDataFromLogNotaFiscalGO', __filename, error)
        }
    }

    async getDataFromLogNotaNFsGYN (tenant: string, competence: string): Promise<ITypeLogResult| ErrorRequestResponse> {
        try {
            const sql = `
                SELECT COALESCE( SUM(CASE WHEN log."typeLog" = 'success' THEN 1 ELSE 0 END), 0 ) AS "success",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'to_process' THEN 1 ELSE 0 END), 0 ) AS "to_process",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'error' THEN 1 ELSE 0 END), 0 ) AS "error",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'warning' THEN 1 ELSE 0 END), 0 ) AS "warning",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'processing' THEN 1 ELSE 0 END), 0 ) AS "processing",
                       COALESCE( SUM(1), 0 ) AS "total",
                       COALESCE( MAX(CASE WHEN log."typeLog" = 'success' THEN log."updatedAt" ELSE NULL END) ) AS "lastUpdatedSuccess"

                  FROM "${tenant}".log_nfs_pref_gyn AS log
                 WHERE EXTRACT(MONTH FROM log."dateStartDown") = EXTRACT( MONTH FROM DATE($<competence>) )
                   AND EXTRACT(YEAR FROM log."dateStartDown") = EXTRACT( YEAR FROM DATE($<competence>) )
            `

            const result = await this.connection.query(sql, { competence })
            const data: ITypeLogResult = result[0]
            return data
        } catch (error) {
            return MakeErrorRequestResponseV2('public.clients_resume', 'getDataFromLogNotaNFsGYN', __filename, error)
        }
    }
}