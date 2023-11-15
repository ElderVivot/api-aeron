import { IsString, MinLength, MaxLength, IsOptional, IsNumber, Matches } from 'class-validator'

export class ConfirmRegistrationDto {
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'The password should be have minim: 1 upperCase, 1 letter, 1 number and 1 special char.' }
    )
    password: string

    @IsString()
    @MinLength(2)
    name: string

    @IsOptional()
    @IsString()
    nickName?: string

    @IsOptional()
    @IsNumber()
    dddPhone?: number

    @IsOptional()
    @IsString()
    phone?: string
}