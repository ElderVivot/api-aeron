import { v4 as uuid } from 'uuid'

import { TModelNotaFiscal, TSituationNotaFiscal, TTypeLogNotaFiscal, TTypeSearch } from './type'

export class LogNotaFiscal {
    idLogNotaFiscal: string
    idCompanie: string
    createdAt:Date
    updatedAt:Date
    modelNotaFiscal: TModelNotaFiscal
    situationNotaFiscal: TSituationNotaFiscal
    dateStartDown:Date
    dateEndDown:Date
    typeLog: TTypeLogNotaFiscal
    messageLog: string
    messageLogToShowUser: string
    wayCertificate: string
    messageError: string
    qtdNotesDown: number
    qtdTimesReprocessed: number
    pageInicial: number
    pageFinal: number
    qtdPagesTotal: number
    urlPrintLog: string
    typeSearch: TTypeSearch

    constructor () {
        if (!this.idLogNotaFiscal) {
            this.idLogNotaFiscal = uuid()
        }
    }
}