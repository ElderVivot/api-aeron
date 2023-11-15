import { Response } from 'express'

import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { ValidationPipeCustom } from '@common/pipes/validation-custom.pipe'
import { Body, Controller, Delete, Get, Headers, Param, ParseUUIDPipe, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { Certificate } from './certificate.entity'
import { CertificateService } from './certificate.service'
import { FilterDto } from './dto/filter.dto'

@Controller('certificate')
export class CertificateController {
    constructor (private service: CertificateService) {}

    @Get()
    async index (
        @Headers('tenant') tenant: string,
        @Query(ValidationPipeCustom) dto: FilterDto
    ): Promise<Certificate[] | ErrorRequestResponse> {
        return this.service.index(dto, tenant)
    }

    @Get('/list_certificate_not_overdue')
    async getListCertificateNotOverdue (
        @Headers('tenant') tenant: string,
        @Query(ValidationPipeCustom) dto: FilterDto
    ): Promise<string[] | ErrorRequestResponse> {
        return this.service.getListCertificateNotOverdue(dto, tenant)
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

    @Get('/:id')
    async show (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id:string
    ): Promise<Certificate | ErrorRequestResponse> {
        return await this.service.show(id, tenant)
    }

    @Get('/:id/show_with_decrypt_password')
    async showWithDecryptPassword (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id:string
    ): Promise<Certificate | ErrorRequestResponse> {
        return await this.service.showWithDecryptPassword(id, tenant)
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async store (
        @Headers('tenant') tenant: string,
        @Body('password') password: string,
        @UploadedFile() file: Express.Multer.File
    ): Promise<Pick<Certificate, 'idCertificate'> | ErrorRequestResponse> {
        return await this.service.store({ file, password }, tenant)
    }

    @Delete('/:id')
    async destroy (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id:string
    ): Promise<IDeleteResult | ErrorRequestResponse> {
        return await this.service.destroy(id, tenant)
    }

    @Put('/:id')
    @UseInterceptors(FileInterceptor('file'))
    async update (
        @Headers('tenant') tenant: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body('password') password: string,
        @UploadedFile() file: Express.Multer.File
    ): Promise<Certificate | ErrorRequestResponse> {
        return await this.service.update(id, { file, password }, tenant)
    }
}