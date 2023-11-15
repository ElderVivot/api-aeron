import { IsOptional, IsIn, IsDateString, IsString, IsNumberString } from 'class-validator'

import { TTypeLogNotaFiscal, typesLogNotaFiscal } from '../type'

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
    codeCompanieAccountSystem?: string

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
}