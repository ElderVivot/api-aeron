import { AwsS3Module } from '@common/aws/s3/s3.module'
import { ConnectionModule } from '@database/connection.module'
import { CityRepository } from '@modules/public/city/city.repository'
import { StateRepository } from '@modules/public/state/state.repository'
import { Module } from '@nestjs/common'

import { CertificateController } from './certificate.controller'
import { CertificateRepository } from './certificate.repository'
import { CertificateService } from './certificate.service'

@Module({
    imports: [ConnectionModule, AwsS3Module],
    controllers: [CertificateController],
    providers: [CertificateService, CertificateRepository, CityRepository, StateRepository]
})
export class TCertificateModule {}