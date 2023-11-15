import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { Controller, Get, Param, Query } from '@nestjs/common'

import { ValidationPipeCustom } from '../../../common/pipes/validation-custom.pipe'
import { ClientsResume, ClientsResumeShowQtdRecordsAnyTable } from './clients_resume.entity'
import { ClientsResumeService } from './clients_resume.service'
import { FilterDto } from './dto/filter.dto'

@Controller('clients_resume')
export class ClientsResumeController {
    constructor (private service: ClientsResumeService) {}

    @Get()
    async index (
        @Query(ValidationPipeCustom) filterDto: FilterDto
    ): Promise<ClientsResume[] | ErrorRequestResponse> {
        return this.service.index(filterDto)
    }

    @Get('show_qtd_records_in_any_table/:table_name')
    async indexQtdRecordsInAnyTable (
        @Param('table_name') tableName: string
    ): Promise<ClientsResumeShowQtdRecordsAnyTable[] | ErrorRequestResponse> {
        return this.service.indexQtdRecordsInAnyTable(tableName)
    }
}