import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator'

import { TTypeLogNotaFiscal, typesLogNotaFiscal } from '../type'

export class CreateOrUpdateDto {
    @IsOptional()
    @IsDateString()
    updatedAt?: Date

    @IsOptional()
    @IsString()
    idAccessPortals?: string

    @IsOptional()
    @IsString()
    idCompanie?: string

    @IsOptional()
    @IsString()
    federalRegistration?: string

    @IsOptional()
    @IsString()
    codeCompanieAccountSystem?: string

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
}