import { IsOptional, IsNotEmpty } from 'class-validator'

export class GetStateFilterDto {
    @IsOptional()
    @IsNotEmpty()
    name?: string

    @IsOptional()
    @IsNotEmpty()
    acronym?: string
}