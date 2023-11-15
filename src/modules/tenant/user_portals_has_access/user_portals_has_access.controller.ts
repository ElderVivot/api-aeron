import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { ValidationPipeCustom } from '@common/pipes/validation-custom.pipe'
import { Body, Controller, Delete, Get, Headers, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common'

import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'
import { UserPortalsHasAccess } from './user_portals_has_access.entity'
import { UserPortalsHasAccessService } from './user_portals_has_access.service'

@Controller('user_portals_has_access')
export class UserPortalsHasAccessController {
    constructor (private service: UserPortalsHasAccessService) {}

    @Get()
    async index (
        @Headers('tenant') tenant: string,
        @Query(ValidationPipeCustom) dto: FilterDto
    ): Promise<UserPortalsHasAccess[] | ErrorRequestResponse> {
        return this.service.index(dto, tenant)
    }

    @Get('/:id')
    async show (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id:string
    ): Promise<UserPortalsHasAccess | ErrorRequestResponse> {
        return await this.service.show(id, tenant)
    }

    @Post()
    async store (
        @Headers('tenant') tenant: string,
        @Body(ValidationPipeCustom) dto: CreateOrUpdateDto
    ): Promise<Pick<UserPortalsHasAccess, 'idUserPortalsHasAccess'> | ErrorRequestResponse> {
        return await this.service.store(dto, tenant)
    }

    @Delete('/:id')
    async destroy (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id:string
    ): Promise<IDeleteResult | ErrorRequestResponse> {
        return await this.service.destroy(id, tenant)
    }

    @Put('/:id')
    async update (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipeCustom) dto: CreateOrUpdateDto
    ): Promise<UserPortalsHasAccess | ErrorRequestResponse> {
        return await this.service.update(id, dto, tenant)
    }
}