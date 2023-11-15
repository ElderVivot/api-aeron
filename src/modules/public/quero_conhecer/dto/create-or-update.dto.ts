import { IsNotEmpty, IsEmail } from 'class-validator'

import { EOccupation } from '../enums/e-occupation'

export class CreateOrUpdateDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    companie: string

    @IsNotEmpty()
    occupation: EOccupation
}