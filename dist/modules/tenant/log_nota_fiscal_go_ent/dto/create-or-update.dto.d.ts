import { TTypeLogNotaFiscal } from '../type';
export declare class CreateOrUpdateDto {
    updatedAt?: Date;
    idAccessPortals?: string;
    idCompanie?: string;
    federalRegistration?: string;
    codeCompanieAccountSystem?: string;
    dateStartDown: string;
    dateEndDown: string;
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
}
