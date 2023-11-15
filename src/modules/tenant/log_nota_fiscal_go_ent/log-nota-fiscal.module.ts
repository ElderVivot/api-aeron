import { AwsS3Module } from '@common/aws/s3/s3.module'
import { ConnectionModule } from '@database/connection.module'
import { CompanieRepository } from '@modules/tenant/companie/companie.repository'
import { Module } from '@nestjs/common'

import { LogNotaFiscalController } from './log-nota-fiscal.controller'
import { LogNotaFiscalRepository } from './log-nota-fiscal.repository'
import { LogNotaFiscalService } from './log-nota-fiscal.service'

@Module({
    imports: [ConnectionModule, AwsS3Module],
    controllers: [LogNotaFiscalController],
    providers: [LogNotaFiscalService, LogNotaFiscalRepository, CompanieRepository]
})
export class TLogNotaFiscalGoEntModule {}