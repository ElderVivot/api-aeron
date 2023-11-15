import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator'

import { TModelNotaFiscal, TSituationNotaFiscal, TTypeLogNotaFiscal, TTypeSearch, typesLogNotaFiscal, typesModelNotaFiscal, typesSearch, typesSituationNotaFiscal } from '../type'

export class CreateOrUpdateDto {
    @IsOptional()
    @IsDateString()
    updatedAt?: Date

    @IsOptional()
    @IsString()
    idCompanie?: string

    @IsOptional()
    @IsString()
    federalRegistration?: string

    @IsOptional()
    @IsString()
    codeCompanieAccountSystem?: string

    @IsNotEmpty()
    @IsIn(typesModelNotaFiscal)
    modelNotaFiscal: TModelNotaFiscal

    @IsNotEmpty()
    @IsIn(typesSituationNotaFiscal)
    situationNotaFiscal: TSituationNotaFiscal

    @IsDateString()
    dateStartDown:string

    @IsDateString()
    dateEndDown:string

    @IsNotEmpty()
    @IsIn(typesLogNotaFiscal)
    typeLog: TTypeLogNotaFiscal

    @IsNotEmpty()
    messageLog: string

    @IsNotEmpty()
    messageLogToShowUser: string

    @IsString()
    wayCertificate: string

    @IsString()
    messageError: string

    @IsNumber()
    qtdNotesDown: number

    @IsNumber()
    qtdTimesReprocessed: number

    @IsNumber()
    pageInicial: number

    @IsNumber()
    pageFinal: number

    @IsNumber()
    qtdPagesTotal: number

    @IsString()
    @IsOptional()
    urlPrintLog: string

    @IsOptional()
    @IsIn(typesSearch)
    typeSearch: TTypeSearch
}