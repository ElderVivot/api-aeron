import { IsOptional, IsNotEmpty, IsDateString, IsIn, IsNumberString, IsString } from 'class-validator'

export class FilterDto {
    @IsOptional()
    @IsNumberString()
    _page?: string

    @IsOptional()
    @IsNumberString()
    _limit?: string

    @IsOptional()
    @IsNotEmpty()
    nameCert?: string

    @IsOptional()
    @IsNotEmpty()
    federalRegistration?: string

    @IsOptional()
    @IsNotEmpty()
    federalRegistrationPartial?: string

    @IsOptional()
    @IsNotEmpty()
    statusCert?: string

    @IsOptional()
    @IsDateString()
    endDateValidity?: string

    @IsOptional()
    @IsIn(['0', '1'])
    hasProcurationEcac?: '0' | '1'

    @IsOptional()
    @IsString()
    codeCompanies?: string
}