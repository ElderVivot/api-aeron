import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common'

import { IDeleteResult } from '../../../common/interfaces/delete-result'
import { ValidationPipeCustom } from '../../../common/pipes/validation-custom.pipe'
import { Client } from './client.entity'
import { ClientService } from './client.service'
import { AddUserDto } from './dto/add-user.dto'
import { CreateOrUpdateClientDto } from './dto/create-or-update-client.dto'
import { GetClientFilterDto } from './dto/get-client-filter.dto'

@Controller('client')
export class ClientController {
    constructor (private clientService: ClientService) {}

    @Get()
    async index (
        @Query(ValidationPipeCustom) filterDto: GetClientFilterDto
    ): Promise<Client[] | ErrorRequestResponse> {
        return this.clientService.index(filterDto)
    }

    @Get('/:id')
    async show (
        @Param('id', ParseUUIDPipe) id:string
    ): Promise<Client | ErrorRequestResponse> {
        return await this.clientService.show(id)
    }

    @Post()
    async store (
        @Body(ValidationPipeCustom) createOrUpdateClientDto: CreateOrUpdateClientDto
    ): Promise<Pick<Client, 'idClient'> | ErrorRequestResponse> {
        return await this.clientService.store(createOrUpdateClientDto)
    }

    @Delete('/:id')
    async destroy (
        @Param('id', ParseUUIDPipe) id:string
    ): Promise<IDeleteResult | ErrorRequestResponse> {
        return await this.clientService.destroy(id)
    }

    @Put('/:id')
    async update (
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipeCustom) createOrUpdateClientDto: CreateOrUpdateClientDto
    ): Promise<Client | ErrorRequestResponse> {
        return await this.clientService.update(id, createOrUpdateClientDto)
    }

    @Patch('/:id/add_users')
    async addUsers (@Param('id', ParseUUIDPipe)
        id: string,
        @Body(ValidationPipeCustom) addUsersDto: AddUserDto
    ): Promise<void | ErrorRequestResponse> {
        return await this.clientService.addUsers(id, addUsersDto)
    }
}