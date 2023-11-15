import { makeDateImplementation } from '@common/adapters/date/date-factory'
import { DateImplementation } from '@common/adapters/date/date-implementation'
import { MakeErrorRequestResponseV2, ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { Injectable } from '@nestjs/common'

import { ClientRepository } from '../client/client.repository'
import { ClientsResume, ClientsResumeShowQtdRecordsAnyTable } from './clients_resume.entity'
import { ClientsResumeRepository } from './clients_resume.repository'
import { FilterDto } from './dto/filter.dto'

@Injectable()
export class ClientsResumeService {
    private dateImplementation: DateImplementation

    constructor (
        private repository: ClientsResumeRepository,
        private clientRepository: ClientRepository
    ) {
        this.dateImplementation = makeDateImplementation()
    }

    async index (filter: FilterDto): Promise<ClientsResume[] | ErrorRequestResponse> {
        try {
            const dataResult: ClientsResume[] = []
            const clients = await this.clientRepository.index(filter)
            if (clients instanceof ErrorRequestResponse) throw clients

            for (const client of clients) {
                const tenant = client.idClient.substring(0, 15)

                const qtdRecordCompanie = await this.repository.getDataCompanies(tenant, filter.competence)
                if (qtdRecordCompanie instanceof ErrorRequestResponse) throw qtdRecordCompanie

                const qtdRecordGOResult = await this.repository.getDataFromLogNotaFiscalGO(tenant, filter.competence)
                if (qtdRecordGOResult instanceof ErrorRequestResponse) throw qtdRecordGOResult

                const qtdRecordGYNResult = await this.repository.getDataFromLogNotaNFsGYN(tenant, filter.competence)
                if (qtdRecordGYNResult instanceof ErrorRequestResponse) throw qtdRecordGOResult

                dataResult.push({
                    tenant,
                    name: client.name,
                    typeFederalRegistration: client.typeFederalRegistration,
                    federalRegistration: client.federalRegistration,
                    status: client.status,
                    dateAsClient: client.dateAsClient,
                    competence: new Date(filter.competence),
                    qtdCompaniesActive: Number(qtdRecordCompanie.qtd),
                    qtdRecordGOSaidasSuccess: Number(qtdRecordGOResult.success),
                    qtdRecordGOSaidasWarning: Number(qtdRecordGOResult.warning),
                    qtdRecordGOSaidasToProcess: Number(qtdRecordGOResult.to_process),
                    qtdRecordGOSaidasProcessing: Number(qtdRecordGOResult.processing),
                    qtdRecordGOSaidasError: Number(qtdRecordGOResult.error),
                    qtdRecordGOSaidasTotal: Number(qtdRecordGOResult.total),
                    lastUpdateInRecordGOSaidasTotal: qtdRecordGOResult.lastUpdatedSuccess,
                    qtdRecordGYNServicosSuccess: Number(qtdRecordGYNResult.success),
                    qtdRecordGYNServicosWarning: Number(qtdRecordGYNResult.warning),
                    qtdRecordGYNServicosToProcess: Number(qtdRecordGYNResult.to_process),
                    qtdRecordGYNServicosProcessing: Number(qtdRecordGYNResult.processing),
                    qtdRecordGYNServicosError: Number(qtdRecordGYNResult.error),
                    qtdRecordGYNServicosTotal: Number(qtdRecordGYNResult.total),
                    lastUpdateInRecordGYNServicosTotal: qtdRecordGYNResult.lastUpdatedSuccess
                })
            }
            return dataResult
        } catch (error) {
            return MakeErrorRequestResponseV2('public.clients_resume', 'index', __filename, error)
        }
    }

    async indexQtdRecordsInAnyTable (tableName: string): Promise<ClientsResumeShowQtdRecordsAnyTable[] | ErrorRequestResponse> {
        try {
            const dataResult: ClientsResumeShowQtdRecordsAnyTable[] = []
            const clients = await this.clientRepository.index({})
            if (clients instanceof ErrorRequestResponse) throw clients

            for (const client of clients) {
                const tenant = client.idClient.substring(0, 15)

                const qtdRecordAnyTable = await this.repository.getQtdRecordsInAnyTable(tenant, tableName)
                if (qtdRecordAnyTable instanceof ErrorRequestResponse) throw qtdRecordAnyTable

                dataResult.push({
                    tenant,
                    name: client.name,
                    typeFederalRegistration: client.typeFederalRegistration,
                    federalRegistration: client.federalRegistration,
                    status: client.status,
                    dateAsClient: client.dateAsClient,
                    tableName,
                    qtdRecords: Number(qtdRecordAnyTable.qtd)
                })
            }
            return dataResult
        } catch (error) {
            return MakeErrorRequestResponseV2('public.clients_resume', 'indexQtdRecordsInAnyTable', __filename, error)
        }
    }
}