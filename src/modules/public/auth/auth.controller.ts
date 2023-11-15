import { ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { User } from '../user_client/user.entity'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto/auth-credential.dto'
import { GetUser } from './get-user.decorator'
import { ISignIn } from './interfaces/sign-in'
import { IUserAuth } from './interfaces/user'

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('/signin')
    async signIn (@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<ISignIn | ErrorRequestResponse> {
        return await this.authService.signIn(authCredentialsDto)
    }

    @Post('/get_data_user')
    @UseGuards(AuthGuard())
    async getDataUser (@GetUser() user: User): Promise<IUserAuth | ErrorRequestResponse> {
        return await this.authService.getDataUser(user)
    }
}