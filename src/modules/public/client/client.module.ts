import { ConnectionModule } from '@database/connection.module'
import { Module } from '@nestjs/common'

import { CityRepository } from '../city/city.repository'
import { StateRepository } from '../state/state.repository'
import { UserRepository } from '../user_client/user.repository'
import { ClientController } from './client.controller'
import { ClientRepository } from './client.repository'
import { ClientService } from './client.service'

@Module({
    imports: [ConnectionModule],
    controllers: [ClientController],
    providers: [ClientService, ClientRepository, CityRepository, StateRepository, UserRepository]
})
export class ClientModule {}