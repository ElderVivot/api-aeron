import { TTypeLogNfsPrefGyn } from '../type';
export declare class CreateOrUpdateDto {
    idAccessPortals: string;
    idCompanie?: string;
    federalRegistration?: string;
    codeCompanieAccountSystem?: string;
    cityRegistration?: string;
    nameCompanie?: string;
    dateStartDown: string;
    dateEndDown: string;
    typeLog: TTypeLogNfsPrefGyn;
    messageLog: string;
    messageLogToShowUser: string;
    messageError: string;
    qtdNotesDown: number;
    qtdTimesReprocessed: number;
    urlsXmls?: string;
    urlPrintLog?: string;
}
