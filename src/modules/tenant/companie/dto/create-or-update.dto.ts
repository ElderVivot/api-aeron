import { IsNotEmpty, IsNumber, IsOptional, IsDateString, IsString, IsIn } from 'class-validator'

import { ETypeFederalRegistration, eTypeFederalRegistration } from '@common/enums/e-type-federal-registration'

import { ECompanieStatus, eCompanieStatus } from '../types/e-companie-status'

export class CreateOrUpdateDto {
    @IsNotEmpty()
    @IsString()
    codeCompanieAccountSystem: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    nickName?: string

    @IsNotEmpty()
    @IsIn(eTypeFederalRegistration)
    typeFederalRegistration: ETypeFederalRegistration

    @IsNotEmpty()
    @IsString()
    federalRegistration: string

    @IsOptional()
    @IsString()
    stateRegistration: string

    @IsOptional()
    @IsString()
    cityRegistration: string

    @IsOptional()
    @IsNumber()
    dddPhone?: number

    @IsOptional()
    @IsString()
    phone?: string

    @IsOptional()
    @IsString()
    email?: string

    @IsNumber()
    idIbgeCity: number

    @IsOptional()
    @IsString()
    neighborhood?: string

    @IsOptional()
    @IsString()
    street?: string

    @IsOptional()
    @IsString()
    zipCode?: string

    @IsOptional()
    @IsString()
    complement?: string

    @IsOptional()
    @IsString()
    referency?: string

    @IsOptional()
    @IsIn(eCompanieStatus)
    status?: ECompanieStatus

    @IsOptional()
    @IsDateString()
    dateInicialAsCompanie?: string

    @IsOptional()
    @IsDateString()
    dateInicialAsClient?: string

    @IsOptional()
    @IsDateString()
    dateFinalAsClient?: string

    @IsOptional()
    @IsString()
    cnaes?: string

    @IsOptional()
    @IsString()
    taxRegime?: '01' | '02' | '03' | '99'
}