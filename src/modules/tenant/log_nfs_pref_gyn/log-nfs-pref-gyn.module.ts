import { AwsS3Module } from '@common/aws/s3/s3.module'
import { ConnectionModule } from '@database/connection.module'
import { CompanieRepository } from '@modules/tenant/companie/companie.repository'
import { Module } from '@nestjs/common'

import { LogNfsPrefGynController } from './log-nfs-pref-gyn.controller'
import { LogNfsPrefGynRepository } from './log-nfs-pref-gyn.repository'
import { LogNfsPrefGynService } from './log-nfs-pref-gyn.service'

@Module({
    imports: [ConnectionModule, AwsS3Module],
    controllers: [LogNfsPrefGynController],
    providers: [LogNfsPrefGynService, LogNfsPrefGynRepository, CompanieRepository]
})
export class TLogNfsPrefGynModule {}