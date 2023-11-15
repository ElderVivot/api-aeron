import { Response } from 'express'

import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { ValidationPipeCustom } from '@common/pipes/validation-custom.pipe'
import { Body, Controller, Delete, Get, Headers, Param, ParseUUIDPipe, Post, Put, Query, Res } from '@nestjs/common'

import { Companie } from './companie.entity'
import { CompanieService } from './companie.service'
import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'

@Controller('companie')
export class CompanieController {
    constructor (private service: CompanieService) {}

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

    @Get('/get_list_idCompanie')
    async indexOnlyIDCompanie (
        @Headers('tenant') tenant: string,
        @Query(ValidationPipeCustom) dto: FilterDto,
        @Res() res: Response
    ): Promise<void> {
        const dataService = await this.service.indexOnlyIDCompanie(dto, tenant)
        if (!(dataService instanceof ErrorRequestResponse)) {
            res.setHeader('x-total-count', dataService.count)
            res.send(dataService.data)
        }
    }

    @Get('/:id')
    async show (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id:string
    ): Promise<Companie | ErrorRequestResponse> {
        return await this.service.show(id, tenant)
    }

    @Post()
    async store (
        @Headers('tenant') tenant: string,
        @Body(ValidationPipeCustom) dto: CreateOrUpdateDto
    ): Promise<Pick<Companie, 'idCompanie'> | ErrorRequestResponse> {
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
    ): Promise<Companie | ErrorRequestResponse> {
        return await this.service.update(id, dto, tenant)
    }
}