import { IsIn, IsOptional, IsString, IsUUID } from 'class-validator'

import { TTypeStatusAccess, typesStatusAccess } from '../types/status-access'

export class FilterDto {
    @IsOptional()
    @IsUUID()
    idTypeAccessPortals?: string

    @IsOptional()
    @IsUUID()
    idAccessPortals?: string

    @IsOptional()
    @IsUUID()
    idCertificate?: string

    @IsOptional()
    @IsString()
    stateRegistration?: string

    @IsOptional()
    @IsString()
    cityRegistration?: string

    @IsOptional()
    @IsString()
    federalRegistration?: string

    @IsOptional()
    @IsIn(typesStatusAccess)
    status?: TTypeStatusAccess
}