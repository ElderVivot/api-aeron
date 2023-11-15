import { IsNotEmpty, IsArray } from 'class-validator'

export class AddUserDto {
    @IsNotEmpty()
    @IsArray()
    usersId: Array<string>
}