import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common'

import { ValidationPipeCustom } from '../../../common/pipes/validation-custom.pipe'
import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { FilterDto } from './dto/filter.dto'
import { QueroConhecer } from './quero_conhecer.entity'
import { QueroConhecerService } from './quero_conhecer.service'

@Controller('quero_conhecer')
export class QueroConhecerController {
    constructor (private service: QueroConhecerService) {}

    @Get()
    async index (
        @Query(ValidationPipeCustom) filterDto: FilterDto
    ): Promise<QueroConhecer[] | ErrorRequestResponse> {
        return this.service.index(filterDto)
    }

    @Get('/:id')
    async show (
        @Param('id', ParseUUIDPipe) id:string
    ): Promise<QueroConhecer | ErrorRequestResponse> {
        return await this.service.show(id)
    }

    @Post()
    async store (
        @Body(ValidationPipeCustom) dto: CreateOrUpdateDto
    ): Promise<QueroConhecer | ErrorRequestResponse> {
        return await this.service.store(dto)
    }
}