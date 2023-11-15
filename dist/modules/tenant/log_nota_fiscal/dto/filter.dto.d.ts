import { TModelNotaFiscal, TSituationNotaFiscal, TTypeLogNotaFiscal, TTypeSearch } from '../type';
export declare class FilterDto {
    _page?: string;
    _limit?: string;
    idCompanie?: string;
    idCompanieList?: string;
    federalRegistration?: string;
    typeFederalRegistration?: string;
    codeCompanieAccountSystem?: string;
    modelNotaFiscal?: TModelNotaFiscal;
    situationNotaFiscal?: TSituationNotaFiscal;
    dateStartDown?: string;
    dateEndDown?: string;
    dateStartDownBetween?: string;
    dateEndDownBetween?: string;
    competence?: Date;
    typeLog?: TTypeLogNotaFiscal;
    codeCompanies?: string;
    nameCompanie?: string;
    typeSearch?: TTypeSearch;
}
