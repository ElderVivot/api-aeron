import { IsDateString, IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator'

import { TTypeStatusAccess, typesStatusAccess } from '../types/status-access'

export class CreateOrUpdateDto {
    @IsNotEmpty()
    @IsUUID()
    idTypeAccessPortals: string

    @IsString()
    idAccessPortals: string

    @IsString()
    idCertificate: string

    @IsNotEmpty()
    @IsString()
    nameCompanie: string

    @IsIn(typesStatusAccess)
    status: TTypeStatusAccess

    @IsString()
    stateRegistration: string

    @IsString()
    cityRegistration: string

    @IsString()
    federalRegistration: string

    @IsString()
    nameCity: string

    @IsDateString()
    dateStartAccess: Date

    @IsDateString()
    dateEndAccess: Date
}