import { IsOptional, IsNotEmpty, IsEmail, IsBooleanString } from 'class-validator'

export class GetUserDto {
    @IsOptional()
    @IsNotEmpty()
    username: string

    @IsOptional()
    @IsBooleanString()
    active: string

    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsNotEmpty()
    phone: string

    @IsOptional()
    @IsNotEmpty()
    name: string
}