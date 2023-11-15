import { Response } from 'express'

import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { ValidationPipeCustom } from '@common/pipes/validation-custom.pipe'
import { Body, Controller, Delete, Get, Headers, Param, ParseUUIDPipe, Post, Put, Query, Res } from '@nestjs/common'

import { AccessPortals } from './access_portals.entity'
import { AccessPortalsService } from './access_portals.service'
import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'

@Controller('access_portals')
export class AccessPortalsController {
    constructor (private service: AccessPortalsService) {}

    @Get()
    async index (
        @Headers('tenant') tenant: string,
        @Query(ValidationPipeCustom) dto: FilterDto,
        @Res() res: Response
    ): Promise<void> {
        const dataService = await this.service.index(dto, tenant)
        if (!(dataService instanceof ErrorRequestResponse)) {
            res.setHeader('x-total-count', dataService.count)
            res.send(dataService.data)
        }
    }

    @Get('/:id')
    async show (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id:string
    ): Promise<AccessPortals | ErrorRequestResponse> {
        return await this.service.show(id, tenant)
    }

    @Get('/:id/show_with_decrypt_password')
    async showWithDecryptPassword (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id:string
    ): Promise<AccessPortals | ErrorRequestResponse> {
        return await this.service.showWithDecryptPassword(id, tenant)
    }

    @Post()
    async store (
        @Headers('tenant') tenant: string,
        @Body(ValidationPipeCustom) dto: CreateOrUpdateDto
    ): Promise<Pick<AccessPortals, 'idAccessPortals'> | ErrorRequestResponse> {
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
    ): Promise<AccessPortals | ErrorRequestResponse> {
        return await this.service.update(id, dto, tenant)
    }

    @Put('/:id/password_incorrect')
    async updateDataAboutPasswordIncorrect (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<AccessPortals | ErrorRequestResponse> {
        return await this.service.updateDataAboutPasswordIncorrect(id, tenant)
    }
}