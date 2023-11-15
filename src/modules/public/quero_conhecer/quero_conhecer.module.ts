import { ConnectionModule } from '@database/connection.module'
import { Module } from '@nestjs/common'

import { QueroConhecerController } from './quero_conhecer.controller'
import { QueroConhecerRepository } from './quero_conhecer.repository'
import { QueroConhecerService } from './quero_conhecer.service'

@Module({
    imports: [ConnectionModule],
    controllers: [QueroConhecerController],
    providers: [QueroConhecerService, QueroConhecerRepository]
})
export class QueroConhecerModule {}