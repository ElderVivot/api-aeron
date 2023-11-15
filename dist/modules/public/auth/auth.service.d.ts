import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user_client/user.entity';
import { UserRepository } from '../user_client/user.repository';
import { AuthRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { ISignIn } from './interfaces/sign-in';
import { IUserAuth } from './interfaces/user';
export declare class AuthService {
    private jwtService;
    private repository;
    private userRepository;
    private readonly cryptImplementation;
    constructor(jwtService: JwtService, repository: AuthRepository, userRepository: UserRepository);
    private validPassword;
    private getClientsUserHaveAccess;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<ISignIn | ErrorRequestResponse>;
    getDataUser(user: User): Promise<IUserAuth | ErrorRequestResponse>;
}
