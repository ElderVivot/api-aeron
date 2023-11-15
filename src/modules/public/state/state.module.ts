import { ConnectionModule } from '@database/connection.module'
import { Module } from '@nestjs/common'

import { StateController } from './state.controller'
import { StateRepository } from './state.repository'
import { StateService } from './state.service'

@Module({
    imports: [ConnectionModule],
    controllers: [StateController],
    providers: [StateService, StateRepository],
    exports: [StateRepository]
})
export class StateModule {}