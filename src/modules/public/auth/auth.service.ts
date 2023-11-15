import { ICryptAdapter, makeCryptImplementation } from '@common/adapters/crypt'
import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from '../user_client/user.entity'
import { UserRepository } from '../user_client/user.repository'
import { AuthRepository } from './auth.repository'
import { AuthCredentialsDto } from './dto/auth-credential.dto'
import { IJwtPayload } from './interfaces/jwt-payload'
import { ISignIn } from './interfaces/sign-in'
import { IClientsUserHaveAccess, IUserAuth } from './interfaces/user'

@Injectable()
export class AuthService {
    private readonly cryptImplementation: ICryptAdapter

    constructor (
        private jwtService: JwtService,
        private repository: AuthRepository,
        private userRepository: UserRepository
    ) {
        this.cryptImplementation = makeCryptImplementation()
    }

    private async validPassword (user: User, password: string): Promise<boolean> {
        return await this.cryptImplementation.compare(password, user.password)
    }

    private async getClientsUserHaveAccess (username: string): Promise<IClientsUserHaveAccess[]> {
        const clientsUserHaveAccess: IClientsUserHaveAccess[] = []

        const showClientsUserHaveAccess = await this.repository.showClientsUserHaveAccess(username)
        if (showClientsUserHaveAccess instanceof ErrorRequestResponse) throw showClientsUserHaveAccess

        if (showClientsUserHaveAccess.length > 0) {
            for (const clientUser of showClientsUserHaveAccess) {
                clientsUserHaveAccess.push({
                    idUser: clientUser.idUser,
                    username: clientUser.username,
                    idClient: clientUser.idClient,
                    name: clientUser.name,
                    federalRegistration: clientUser.federalRegistration,
                    status: clientUser.status,
                    modules: clientUser.modules
                })
            }
        }
        return clientsUserHaveAccess
    }

    async signIn (authCredentialsDto: AuthCredentialsDto): Promise<ISignIn | ErrorRequestResponse> {
        try {
            const { username, password } = authCredentialsDto

            const user = await this.userRepository.show({ username })
            if (user instanceof ErrorRequestResponse) throw user

            const passwordIsValid = await this.validPassword(user, password)
            if (!passwordIsValid) {
                throw new UnauthorizedException('Invalid credentials')
            }

            const payload: IJwtPayload = { tokenId: user.idUser }
            const accessToken = this.jwtService.sign(payload)

            const userAuth: IUserAuth = user

            userAuth.clientsUserHaveAccess = await this.getClientsUserHaveAccess(username)

            return {
                accessToken,
                user: userAuth
            }
        } catch (error) {
            return MakeErrorRequestResponseV2('public.auth', 'signIn', __filename, error)
        }
    }

    async getDataUser (user: User): Promise<IUserAuth | ErrorRequestResponse> {
        const { username } = user
        try {
            const user = await this.userRepository.show({ username })
            if (user instanceof ErrorRequestResponse) throw user
            delete user.password

            const userAuth: IUserAuth = user

            userAuth.clientsUserHaveAccess = await this.getClientsUserHaveAccess(username)

            return userAuth
        } catch (error) {
            return MakeErrorRequestResponseV2('public.auth', 'getDataUser', __filename, error)
        }
    }
}