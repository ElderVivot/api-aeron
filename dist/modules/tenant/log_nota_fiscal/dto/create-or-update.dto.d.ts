import { TModelNotaFiscal, TSituationNotaFiscal, TTypeLogNotaFiscal, TTypeSearch } from '../type';
export declare class CreateOrUpdateDto {
    updatedAt?: Date;
    idCompanie?: string;
    federalRegistration?: string;
    codeCompanieAccountSystem?: string;
    modelNotaFiscal: TModelNotaFiscal;
    situationNotaFiscal: TSituationNotaFiscal;
    dateStartDown: string;
    dateEndDown: string;
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
}
