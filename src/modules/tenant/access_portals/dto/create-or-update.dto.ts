import { IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator'

import { TTypeStatusAccess, typesStatusAccess } from '../types/status-access'

export class CreateOrUpdateDto {
    @IsNotEmpty()
    @IsUUID()
    idTypeAccessPortals: string

    @IsNotEmpty()
    @IsString()
    nameAccess: string

    @IsNotEmpty()
    @IsString()
    login: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsIn(typesStatusAccess)
    status: TTypeStatusAccess
}