import { IsNotEmpty } from 'class-validator'

export class CreateOrUpdateStateDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    acronym: string
}