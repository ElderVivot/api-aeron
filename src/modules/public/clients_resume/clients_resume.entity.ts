import { EClientStatus } from './enums/e-client-status'
import { ETypeFederalRegistration } from './enums/e-type-federal-registration'

export class ClientsResume {
    tenant: string
    name: string
    typeFederalRegistration: ETypeFederalRegistration
    federalRegistration: string
    status: EClientStatus
    dateAsClient: Date
    competence: Date
    qtdCompaniesActive: number
    qtdRecordGOSaidasSuccess: number
    qtdRecordGOSaidasWarning: number
    qtdRecordGOSaidasToProcess: number
    qtdRecordGOSaidasProcessing: number
    qtdRecordGOSaidasError: number
    qtdRecordGOSaidasTotal: number
    lastUpdateInRecordGOSaidasTotal: Date
    qtdRecordGYNServicosSuccess: number
    qtdRecordGYNServicosWarning: number
    qtdRecordGYNServicosToProcess: number
    qtdRecordGYNServicosProcessing: number
    qtdRecordGYNServicosError: number
    qtdRecordGYNServicosTotal: number
    lastUpdateInRecordGYNServicosTotal: Date
}

export class ClientsResumeShowQtdRecordsAnyTable {
    tenant: string
    name: string
    typeFederalRegistration: ETypeFederalRegistration
    federalRegistration: string
    status: EClientStatus
    dateAsClient: Date
    tableName: string
    qtdRecords: number
}