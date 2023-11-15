import { ConnectionModule } from '@database/connection.module'
import { Module } from '@nestjs/common'

import { ClientRepository } from '../client/client.repository'
import { ResetPasswordRepository } from './reset-password.repository'
import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

@Module({
    imports: [ConnectionModule],
    controllers: [UserController],
    providers: [UserService, UserRepository, ResetPasswordRepository, ClientRepository]
})
export class UserClientModule {}