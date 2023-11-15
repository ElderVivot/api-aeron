import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator'

import { TTypeLogNfsPrefGyn, typesLogNfsPrefGyn } from '../type'

export class CreateOrUpdateDto {
    @IsString()
    idAccessPortals: string

    @IsString()
    @IsOptional()
    idCompanie?: string

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
    @IsString()
    nameCompanie?: string

    @IsDateString()
    dateStartDown:string

    @IsDateString()
    dateEndDown:string

    @IsNotEmpty()
    @IsIn(typesLogNfsPrefGyn)
    typeLog: TTypeLogNfsPrefGyn

    @IsNotEmpty()
    messageLog: string

    @IsNotEmpty()
    messageLogToShowUser: string

    @IsString()
    messageError: string

    @IsNumber()
    qtdNotesDown: number

    @IsNumber()
    qtdTimesReprocessed: number

    @IsOptional()
    @IsString()
    urlsXmls?: string

    @IsOptional()
    @IsString()
    urlPrintLog?: string
}