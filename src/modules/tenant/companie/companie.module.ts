import { ConnectionModule } from '@database/connection.module'
import { CityRepository } from '@modules/public/city/city.repository'
import { StateRepository } from '@modules/public/state/state.repository'
import { Module } from '@nestjs/common'

import { CompanieController } from './companie.controller'
import { CompanieRepository } from './companie.repository'
import { CompanieService } from './companie.service'

@Module({
    imports: [ConnectionModule],
    controllers: [CompanieController],
    providers: [CompanieService, CompanieRepository, CityRepository, StateRepository]
})
export class TCompanieModule {}