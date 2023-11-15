import { ConnectionModule } from '@database/connection.module'
import { Module } from '@nestjs/common'

import { UserPortalsHasAccessController } from './user_portals_has_access.controller'
import { UserPortalsHasAccessRepository } from './user_portals_has_access.repository'
import { UserPortalsHasAccessService } from './user_portals_has_access.service'

@Module({
    imports: [ConnectionModule],
    controllers: [UserPortalsHasAccessController],
    providers: [UserPortalsHasAccessService, UserPortalsHasAccessRepository]
})
export class TUserPortalsHasAccessModule {}