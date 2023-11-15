import { TTypeLogNotaFiscal } from '../type';
export declare class FilterDto {
    _page?: string;
    _limit?: string;
    idCompanie?: string;
    idCompanieList?: string;
    federalRegistration?: string;
    codeCompanieAccountSystem?: string;
    dateStartDown?: string;
    dateEndDown?: string;
    dateStartDownBetween?: string;
    dateEndDownBetween?: string;
    competence?: Date;
    typeLog?: TTypeLogNotaFiscal;
    codeCompanies?: string;
    nameCompanie?: string;
}
