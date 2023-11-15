import { IsOptional, IsNotEmpty, IsIn, IsDateString } from 'class-validator'

import { EClientStatus } from '../enums/e-client-status'

export class FilterDto {
    @IsOptional()
    @IsIn([...Object.keys(EClientStatus)])
    status: EClientStatus

    @IsOptional()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsNotEmpty()
    federalRegistration: string

    @IsDateString()
    competence: string
}