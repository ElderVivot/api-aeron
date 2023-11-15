import { Type } from 'class-transformer'
import { IsString, MinLength, MaxLength, IsOptional, IsEmail, IsNumber, ValidateNested, IsBoolean } from 'class-validator'

export class UserClientPermissionsDto {
    @IsString()
    functionality: string

    @IsString()
    permissions: string
}

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    username: string

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
    @IsString()
    tenantQueroConhecer?: string

    @IsOptional()
    @IsBoolean()
    isUserMain?: boolean

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UserClientPermissionsDto)
    dataListPermissions?: UserClientPermissionsDto[]
}