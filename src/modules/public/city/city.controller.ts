import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { ValidationPipeCustom } from '@common/pipes/validation-custom.pipe'
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes } from '@nestjs/common'

import { City } from './city.entity'
import { CityService } from './city.service'
import { CreateOrUpdateDto } from './dto/create-or-update.dto'
import { GetFilterDto } from './dto/get-filter.dto'

@Controller('city')
export class CityController {
    constructor (private service: CityService) {}

    @Get()
    @UsePipes(ValidationPipeCustom)
    async index (@Query() filterDto: GetFilterDto): Promise<City[] | ErrorRequestResponse> {
        return this.service.index(filterDto)
    }

    @Get('/:id')
    async show (@Param('id') id:number): Promise<City | ErrorRequestResponse> {
        return await this.service.show(id)
    }

    @Post()
    @UsePipes(ValidationPipeCustom)
    async upsert (@Body() createOrUpdateDto: CreateOrUpdateDto): Promise<City | ErrorRequestResponse> {
        return await this.service.upsert(createOrUpdateDto)
    }

    @Delete('/:id')
    async destroy (@Param('id') id:number): Promise<IDeleteResult | ErrorRequestResponse> {
        return await this.service.destroy(id)
    }

    @Put('/:id')
    @UsePipes(ValidationPipeCustom)
    async update (
        @Param('id') id: number,
        @Body() createOrUpdateDto: CreateOrUpdateDto
    ): Promise<City | ErrorRequestResponse> {
        return await this.service.update(id, createOrUpdateDto)
    }
}