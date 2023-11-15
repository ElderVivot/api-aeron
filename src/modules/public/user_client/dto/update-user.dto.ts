import { Type } from 'class-transformer'
import { IsString, MinLength, IsOptional, IsEmail, IsNumber, IsBoolean, ValidateNested } from 'class-validator'

export class UserClientPermissionsDto {
    @IsOptional()
    @IsString()
    idUserPermissions?: string

    @IsString()
    functionality: string

    @IsString()
    permissions: string
}

export class UpdateUserDto {
    @IsBoolean()
    active: boolean

    @IsEmail()
    email: string

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

    @IsOptional()
    @IsString()
    departaments?: string

    @IsOptional()
    @IsBoolean()
    isUserMain?: boolean

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UserClientPermissionsDto)
    dataListPermissions?: UserClientPermissionsDto[]
}