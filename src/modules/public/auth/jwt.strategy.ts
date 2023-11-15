import { Strategy, ExtractJwt } from 'passport-jwt'
import 'dotenv/config'

import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { User } from '../user_client/user.entity'
import { UserRepository } from '../user_client/user.repository'
import { IJwtPayload } from './interfaces/jwt-payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.HASH_SECRET
        })
    }

    // override the default method validation
    async validate (payload: IJwtPayload): Promise<User> {
        const { tokenId: idUser } = payload
        const user = await this.userRepository.show({ idUser })
        if (user instanceof ErrorRequestResponse) throw user
        return user
    }
}