import { TModelNotaFiscal, TSituationNotaFiscal, TTypeLogNotaFiscal, TTypeSearch } from './type';
export declare class LogNotaFiscal {
    idLogNotaFiscal: string;
    idCompanie: string;
    createdAt: Date;
    updatedAt: Date;
    modelNotaFiscal: TModelNotaFiscal;
    situationNotaFiscal: TSituationNotaFiscal;
    dateStartDown: Date;
    dateEndDown: Date;
    typeLog: TTypeLogNotaFiscal;
    messageLog: string;
    messageLogToShowUser: string;
    wayCertificate: string;
    messageError: string;
    qtdNotesDown: number;
    qtdTimesReprocessed: number;
    pageInicial: number;
    pageFinal: number;
    qtdPagesTotal: number;
    urlPrintLog: string;
    typeSearch: TTypeSearch;
    constructor();
}
