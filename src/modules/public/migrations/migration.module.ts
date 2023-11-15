import { ConnectionModule } from '@database/connection.module'
import { Module } from '@nestjs/common'

import { MigrationController } from './migration.controller'
import { MigrationRepository } from './migration.repository'
import { MigrationService } from './migration.service'

@Module({
    imports: [ConnectionModule],
    controllers: [MigrationController],
    providers: [MigrationService, MigrationRepository],
    exports: [MigrationRepository]
})
export class MigrationModule {}