import { IsOptional, IsIn, IsDateString, IsString, IsNumberString } from 'class-validator'

import { TTypeLogNfsPrefGyn, typesLogNfsPrefGyn } from '../type'

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
    idAccessPortals?: string

    @IsOptional()
    @IsString()
    federalRegistration?: string

    @IsOptional()
    @IsString()
    codeCompanieAccountSystem?: string

    @IsOptional()
    @IsString()
    cityRegistration?: string

    @IsOptional()
    @IsDateString()
    competence?: Date

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
    @IsIn(typesLogNfsPrefGyn)
    typeLog?: TTypeLogNfsPrefGyn

    @IsOptional()
    @IsString()
    getPaswordIncorrect?: string

    @IsOptional()
    @IsString()
    codeCompanies?: string

    @IsOptional()
    @IsString()
    cityRegistrationList?: string

    @IsOptional()
    @IsString()
    login?: string

    @IsOptional()
    @IsString()
    nameCompanie?: string
}