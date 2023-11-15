import { TTypeLogNotaFiscal } from './type';
export declare class LogNotaFiscal {
    idLogNotaFiscal: string;
    idCompanie: string;
    idAccessPortals: string;
    createdAt: Date;
    updatedAt: Date;
    modelNotaFiscal: string;
    dateStartDown: Date;
    dateEndDown: Date;
    typeLog: TTypeLogNotaFiscal;
    messageLog: string;
    messageLogToShowUser: string;
    messageError: string;
    qtdNotesDown: number;
    qtdTimesReprocessed: number;
    pageInicial: number;
    pageFinal: number;
    qtdPagesTotal: number;
    urlPrintLog: string;
    constructor();
}
