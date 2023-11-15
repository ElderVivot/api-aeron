import { IsOptional, IsIn, IsDateString, IsString, IsNumberString } from 'class-validator'

import { TModelNotaFiscal, TSituationNotaFiscal, TTypeLogNotaFiscal, TTypeSearch, typesLogNotaFiscal, typesModelNotaFiscal, typesSearch, typesSituationNotaFiscal } from '../type'

export class FilterDto {
    @IsOptional()
    @IsNumberString()
    _page?: string

    @IsOptional()
    @IsNumberString()
    _limit?: string

    @IsOptional()
    @IsString()
    idCompanie?: string

    @IsOptional()
    @IsString()
    idCompanieList?: string

    @IsOptional()
    @IsString()
    federalRegistration?: string

    @IsOptional()
    @IsString()
    typeFederalRegistration?: string

    @IsOptional()
    @IsString()
    codeCompanieAccountSystem?: string

    @IsOptional()
    @IsIn(typesModelNotaFiscal)
    modelNotaFiscal?: TModelNotaFiscal

    @IsOptional()
    @IsIn(typesSituationNotaFiscal)
    situationNotaFiscal?: TSituationNotaFiscal

    @IsOptional()
    @IsDateString()
    dateStartDown?:string

    @IsOptional()
    @IsDateString()
    dateEndDown?:string

    @IsOptional()
    @IsDateString()
    dateStartDownBetween?:string

    @IsOptional()
    @IsDateString()
    dateEndDownBetween?:string

    @IsOptional()
    @IsDateString()
    competence?: Date

    @IsOptional()
    @IsIn(typesLogNotaFiscal)
    typeLog?: TTypeLogNotaFiscal

    @IsOptional()
    @IsString()
    codeCompanies?: string

    @IsOptional()
    @IsString()
    nameCompanie?: string

    @IsOptional()
    @IsIn(typesSearch)
    typeSearch?: TTypeSearch
}