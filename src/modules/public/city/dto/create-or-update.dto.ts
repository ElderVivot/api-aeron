import { IsNotEmpty } from 'class-validator'

export class CreateOrUpdateDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    idIbge: number

    @IsNotEmpty()
    acronymState: string
}