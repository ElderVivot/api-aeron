import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { ValidationPipeCustom } from '@common/pipes/validation-custom.pipe'
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes } from '@nestjs/common'

import { CreateOrUpdateStateDto } from './dto/create-or-update-state.dto'
import { GetStateFilterDto } from './dto/get-state-filter.dto'
import { State } from './state.entity'
import { StateService } from './state.service'

@Controller('state')
export class StateController {
    constructor (private service: StateService) {}

    @Get()
    @UsePipes(ValidationPipeCustom)
    async index (@Query() filterDto: GetStateFilterDto): Promise<State[] | ErrorRequestResponse> {
        return this.service.index(filterDto)
    }

    @Get('/:id')
    async show (@Param('id') id:number): Promise<State | ErrorRequestResponse> {
        return await this.service.show(id)
    }

    @Post()
    @UsePipes(ValidationPipeCustom)
    async store (@Body() createOrUpdateDto: CreateOrUpdateStateDto): Promise<Pick<State, 'id_state'> | ErrorRequestResponse> {
        return await this.service.store(createOrUpdateDto)
    }

    @Delete('/:id')
    async destroy (@Param('id') id:number): Promise<IDeleteResult | ErrorRequestResponse> {
        return await this.service.destroy(id)
    }

    @Put('/:id')
    @UsePipes(ValidationPipeCustom)
    async update (
        @Param('id') id: number,
        @Body() createOrUpdateDto: CreateOrUpdateStateDto
    ): Promise<State | ErrorRequestResponse> {
        return await this.service.update(id, createOrUpdateDto)
    }
}