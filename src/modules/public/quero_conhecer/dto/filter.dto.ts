import { IsEmail, IsOptional } from 'class-validator'

import { EOccupation } from '../enums/e-occupation'

export class FilterDto {
    @IsOptional()
    name?: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    phone?: string

    @IsOptional()
    companie?: string

    @IsOptional()
    occupation?: EOccupation

    @IsOptional()
    alreadyContactedTheCustomer?: string
}