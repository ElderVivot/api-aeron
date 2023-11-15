import { IsNotEmpty, IsNumber, IsOptional, IsDateString, IsString, IsEmail } from 'class-validator'

import { EClientStatus } from '../enums/e-client-status'
import { ETypeFederalRegistration } from '../enums/e-type-federal-registration'

export class CreateOrUpdateClientDto {
    @IsNotEmpty()
    name: string

    @IsOptional()
    nickName?: string

    @IsNotEmpty()
    typeFederalRegistration: ETypeFederalRegistration

    @IsNotEmpty()
    federalRegistration: string

    @IsOptional()
    @IsNumber()
    dddPhone?: number

    @IsOptional()
    @IsString()
    phone?: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsNumber()
    idIbgeCity: number

    @IsOptional()
    neighborhood?: string

    @IsOptional()
    street?: string

    @IsOptional()
    zipCode?: string

    @IsOptional()
    complement?: string

    @IsOptional()
    referency?: string

    @IsOptional()
    status?: EClientStatus

    @IsDateString()
    dateAsClient: string
}