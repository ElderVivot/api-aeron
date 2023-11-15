import { ConnectionModule } from '@database/connection.module'
import { Module } from '@nestjs/common'

import { AccessPortalsController } from './access_portals.controller'
import { AccessPortalsRepository } from './access_portals.repository'
import { AccessPortalsService } from './access_portals.service'

@Module({
    imports: [ConnectionModule],
    controllers: [AccessPortalsController],
    providers: [AccessPortalsService, AccessPortalsRepository]
})
export class TAccessPortalsModule {}