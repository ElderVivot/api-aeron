import { IsOptional, IsNotEmpty, IsDateString } from 'class-validator'

export class GetFilterDto {
    @IsOptional()
    @IsNotEmpty()
    schema?: string

    @IsOptional()
    @IsNotEmpty()
    name?: string

    @IsOptional()
    @IsNotEmpty()
    typeResult?: string

    @IsOptional()
    @IsDateString()
    createdAt?: string
}