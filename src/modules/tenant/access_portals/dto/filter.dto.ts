import { IsNumberString, IsOptional, IsString } from 'class-validator'

export class FilterDto {
    @IsOptional()
    @IsNumberString()
    _page?: string

    @IsOptional()
    @IsNumberString()
    _limit?: string

    @IsOptional()
    @IsString()
    login?: string

    @IsOptional()
    @IsString()
    loginLikeSearch?: string

    @IsOptional()
    @IsString()
    nameAccess?: string

    @IsOptional()
    @IsString()
    idTypeAccessPortals?: string

    @IsOptional()
    @IsString()
    status?: string

    @IsOptional()
    @IsString()
    whatAccesses?: string

    @IsOptional()
    @IsString()
    getPaswordIncorrect?: string
}