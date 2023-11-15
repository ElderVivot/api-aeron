import { IsOptional, IsNotEmpty, IsIn } from 'class-validator'

import { EClientStatus } from '../enums/e-client-status'

export class GetClientFilterDto {
    @IsOptional()
    @IsIn([...Object.keys(EClientStatus)])
    status?: EClientStatus

    @IsOptional()
    @IsNotEmpty()
    name?: string

    @IsOptional()
    @IsNotEmpty()
    federalRegistration?: string
}