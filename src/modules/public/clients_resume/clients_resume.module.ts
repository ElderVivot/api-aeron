import { ConnectionModule } from '@database/connection.module'
import { Module } from '@nestjs/common'

import { ClientRepository } from '../client/client.repository'
import { ClientsResumeController } from './clients_resume.controller'
import { ClientsResumeRepository } from './clients_resume.repository'
import { ClientsResumeService } from './clients_resume.service'

@Module({
    imports: [ConnectionModule],
    controllers: [ClientsResumeController],
    providers: [ClientsResumeService, ClientsResumeRepository, ClientRepository]
})
export class ClientsResumeModule {}