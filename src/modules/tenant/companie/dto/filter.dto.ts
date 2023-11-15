import { IsOptional, IsIn, IsString, IsNumberString } from 'class-validator'

import { ETypeFederalRegistration, eTypeFederalRegistration } from '@common/enums/e-type-federal-registration'

import { ECompanieStatus } from '../types/e-companie-status'

export class FilterDto {
    @IsOptional()
    @IsNumberString()
    _page?: string

    @IsOptional()
    @IsNumberString()
    _limit?: string

    @IsOptional()
    @IsIn([...Object.keys(ECompanieStatus)])
    status?: ECompanieStatus

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsIn(eTypeFederalRegistration)
    typeFederalRegistration?: ETypeFederalRegistration

    @IsOptional()
    @IsString()
    federalRegistration?: string

    @IsOptional()
    @IsString()
    federalRegistrationPartial?: string

    @IsOptional()
    @IsString()
    codeCompanieAccountSystem?: string

    @IsOptional()
    @IsString()
    cityRegistration?: string

    @IsOptional()
    @IsString()
    idRoutine?: string

    @IsOptional()
    @IsString()
    codeCompanies?: string

    @IsOptional()
    @IsString()
    existEmployees?: string
}