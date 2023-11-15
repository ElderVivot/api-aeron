import { ConnectionModule } from '@database/connection.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import 'dotenv/config'
import { UserRepository } from '../user_client/user.repository'
import { AuthController } from './auth.controller'
import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [
        ConnectionModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.HASH_SECRET,
            signOptions: {
                expiresIn: 60 * 60 * 2 // 2 hours
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AuthRepository, UserRepository],
    exports: [JwtStrategy]
})
export class AuthModule {}