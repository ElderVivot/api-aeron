import { Response } from 'express'

import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { ValidationPipeCustom } from '@common/pipes/validation-custom.pipe'
import { Body, Controller, Get, Headers, Param, ParseUUIDPipe, Post, Put, Query, Res } from '@nestjs/common'

import { Companie } from '../companie/companie.entity'
import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'
import { LogNotaFiscal } from './log-nota-fiscal.entity'
import { LogNotaFiscalService } from './log-nota-fiscal.service'

@Controller('log_nota_fiscal_go_ent')
export class LogNotaFiscalController {
    constructor (private service: LogNotaFiscalService) {}

    @Get()
    async index (
        @Headers('tenant') tenant: string,
        @Query(ValidationPipeCustom) dto: FilterDto
    ): Promise<LogNotaFiscal[] | ErrorRequestResponse> {
        return this.service.index(dto, tenant)
    }

    @Get('/frontend')
    async indexToFront (
        @Headers('tenant') tenant: string,
        @Query(ValidationPipeCustom) dto: FilterDto,
        @Res() res: Response
    ): Promise<void> {
        const dataService = await this.service.indexToFront(dto, tenant)
        if (!(dataService instanceof ErrorRequestResponse)) {
            res.setHeader('x-total-count', dataService.count)
            res.send(dataService.data)
        }
    }

    @Get('/get_companies_that_dont_process_yet')
    async getCompaniesThatDontProcessNotaFiscalYet (
        @Headers('tenant') tenant: string,
        @Query(ValidationPipeCustom) dto: FilterDto
    ): Promise<Companie[] | ErrorRequestResponse> {
        return await this.service.getCompaniesThatDontProcessNotaFiscalYet(dto, tenant)
    }

    @Get('/:id')
    async show (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id:string
    ): Promise<LogNotaFiscal | ErrorRequestResponse> {
        return await this.service.show(id, tenant)
    }

    @Post()
    async store (
        @Headers('tenant') tenant: string,
        @Body(ValidationPipeCustom) dto: CreateOrUpdateDto
    ): Promise< Pick<LogNotaFiscal, 'idLogNotaFiscal'> | ErrorRequestResponse> {
        return await this.service.store(dto, tenant)
    }

    @Put('/:id')
    async update (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipeCustom) dto: CreateOrUpdateDto
    ): Promise<LogNotaFiscal | ErrorRequestResponse> {
        return await this.service.update(id, dto, tenant)
    }
}