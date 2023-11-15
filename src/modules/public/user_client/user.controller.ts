import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IResultGenericResponse } from '@common/interfaces/result-generic-response'
import { ValidationPipeCustom } from '@common/pipes/validation-custom.pipe'
import { Controller, Post, Body, Put, Param, Get, Query, ParseUUIDPipe, Patch } from '@nestjs/common'

import { ConfirmRegistrationDto } from './dto/confirm-registration.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUserDto } from './dto/get-user.dto'
import { ResetPasswordDto } from './dto/reset-password'
import { ShowUserDto } from './dto/show-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { IUser } from './interfaces/user'
import { IUserList } from './interfaces/user-list'
import { ResetPassword } from './reset-password.entity'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user_client')
export class UserController {
    constructor (private service: UserService) {}

    @Get(':idClient/list_users')
    async index (
        @Param('idClient', ParseUUIDPipe) idClient:string,
        @Query(ValidationPipeCustom) dto: GetUserDto
    ): Promise<IUserList[] | ErrorRequestResponse> {
        return await this.service.index(idClient, dto)
    }

    @Get(':username/get_list_username')
    async getListUsername (
        @Param('username') username:string
    ): Promise<string[] | ErrorRequestResponse> {
        return await this.service.getListUsername(username)
    }

    @Post()
    async store (
        @Body(ValidationPipeCustom) createUserDto: CreateUserDto
    ): Promise<User | ErrorRequestResponse> {
        return await this.service.store(createUserDto)
    }

    @Get()
    async show (
        @Body(ValidationPipeCustom) showUserDto: ShowUserDto
    ): Promise<User | ErrorRequestResponse> {
        return await this.service.show(showUserDto)
    }

    @Get('/:id')
    async showWithId (
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<User | ErrorRequestResponse> {
        return await this.service.show({ idUser: id })
    }

    @Put('/:id/confirm_registration')
    async confirmRegistration (
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipeCustom) dto: ConfirmRegistrationDto
    ): Promise<IUser | ErrorRequestResponse> {
        return await this.service.confirmRegistration(id, dto)
    }

    @Put('/:id')
    async update (
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipeCustom) dto: UpdateUserDto
    ): Promise<IUser | ErrorRequestResponse> {
        return await this.service.update(id, dto)
    }

    @Post('/:username/send_reset_password')
    async sendInformationToResetPassword (
        @Param('username') username: string
    ): Promise<Pick<ResetPassword, 'idResetPassword'> | ErrorRequestResponse> {
        return await this.service.sendInformationToResetPassword(username)
    }

    @Patch('/:id_reset_password/reset_password')
    async resetPassword (
        @Param('id_reset_password', ParseUUIDPipe) idResetPassword: string,
        @Body(ValidationPipeCustom) dto: ResetPasswordDto
    ): Promise<IResultGenericResponse | ErrorRequestResponse> {
        return await this.service.resetPassword(idResetPassword, dto)
    }
}