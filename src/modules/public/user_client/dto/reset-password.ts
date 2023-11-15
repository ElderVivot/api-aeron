import { IsString, MinLength, MaxLength, Matches } from 'class-validator'

export class ResetPasswordDto {
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'The password should be have minim: 1 upperCase, 1 letter, 1 number and 1 special char.' }
    )
    password: string
}