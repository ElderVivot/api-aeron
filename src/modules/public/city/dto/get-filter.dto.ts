import { IsOptional, IsNotEmpty } from 'class-validator'

export class GetFilterDto {
    @IsOptional()
    @IsNotEmpty()
    name?: string

    @IsOptional()
    @IsNotEmpty()
    acronymState?: string

    @IsOptional()
    @IsNotEmpty()
    idIbge?: number
}