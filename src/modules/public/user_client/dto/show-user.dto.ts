import { IsOptional, IsNotEmpty } from 'class-validator'

export class ShowUserDto {
    @IsOptional()
    @IsNotEmpty()
    username?: string

    @IsOptional()
    @IsNotEmpty()
    idUser?: string
}