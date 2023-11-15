import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { ValidationPipeCustom } from '@common/pipes/validation-custom.pipe'
import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common'

import { GetFilterDto } from './dto/get-filter.dto'
import { Migration } from './migration.entity'
import { MigrationService } from './migration.service'

@Controller('migrations_executed')
export class MigrationController {
    constructor (private service: MigrationService) {}

    @Get()
    @UsePipes(ValidationPipeCustom)
    async index (@Query() filterDto: GetFilterDto): Promise<Migration[] | ErrorRequestResponse> {
        return this.service.index(filterDto)
    }

    @Get('/:id')
    async show (@Param('id') id:number): Promise<Migration | ErrorRequestResponse> {
        return await this.service.show(id)
    }
}