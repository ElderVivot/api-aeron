import { ConnectionModule } from '@database/connection.module'
import { Module } from '@nestjs/common'

import { StateRepository } from '../state/state.repository'
import { CityController } from './city.controller'
import { CityRepository } from './city.repository'
import { CityService } from './city.service'

@Module({
    imports: [ConnectionModule],
    controllers: [CityController],
    providers: [CityService, CityRepository, StateRepository],
    exports: [CityRepository]
})
export class CityModule {}