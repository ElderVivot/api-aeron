import { TTypeLogNfsPrefGyn } from './type';
export declare class LogNfsPrefGyn {
    idLogNfsPrefGyn: string;
    idAccessPortals: string;
    idCompanie: string;
    createdAt: Date;
    updatedAt: Date;
    cityRegistration: string;
    nameCompanie: string;
    dateStartDown: Date;
    dateEndDown: Date;
    typeLog: TTypeLogNfsPrefGyn;
    messageLog: string;
    messageLogToShowUser: string;
    messageError: string;
    urlPrintLog: string;
    qtdNotesDown: number;
    qtdTimesReprocessed: number;
    urlsXmls?: string;
    constructor();
}
