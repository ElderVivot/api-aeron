import { Response } from 'express'

import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { ValidationPipeCustom } from '@common/pipes/validation-custom.pipe'
import { Body, Controller, Get, Headers, Param, ParseUUIDPipe, Patch, Post, Put, Query, Res } from '@nestjs/common'

import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'
import { LogNfsPrefGyn } from './log-nfs-pref-gyn.entity'
import { LogNfsPrefGynService } from './log-nfs-pref-gyn.service'

@Controller('log_nfs_pref_gyn')
export class LogNfsPrefGynController {
    constructor (private service: LogNfsPrefGynService) {}

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
    ): Promise<LogNfsPrefGyn | ErrorRequestResponse> {
        return await this.service.show(id, tenant)
    }

    @Post()
    async store (
        @Headers('tenant') tenant: string,
        @Body(ValidationPipeCustom) dto: CreateOrUpdateDto
    ): Promise< Pick<LogNfsPrefGyn, 'idLogNfsPrefGyn'> | ErrorRequestResponse> {
        return await this.service.store(dto, tenant)
    }

    @Put('/:id')
    async update (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipeCustom) dto: CreateOrUpdateDto
    ): Promise<LogNfsPrefGyn | ErrorRequestResponse> {
        return await this.service.update(id, dto, tenant)
    }

    @Patch('/:id/upload_print_log')
    // @UseInterceptors(FileInterceptor('file'))
    async uploadPrintLog (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipeCustom) body: {bufferImage: string | Buffer}
    ): Promise<LogNfsPrefGyn | ErrorRequestResponse> {
        return await this.service.uploadPrintLog(id, body.bufferImage, tenant)
    }
}