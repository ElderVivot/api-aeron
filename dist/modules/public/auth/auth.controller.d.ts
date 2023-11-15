import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { User } from '../user_client/user.entity';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { ISignIn } from './interfaces/sign-in';
import { IUserAuth } from './interfaces/user';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<ISignIn | ErrorRequestResponse>;
    getDataUser(user: User): Promise<IUserAuth | ErrorRequestResponse>;
}
