import { Strategy } from 'passport-jwt';
import 'dotenv/config';
import { User } from '../user_client/user.entity';
import { UserRepository } from '../user_client/user.repository';
import { IJwtPayload } from './interfaces/jwt-payload';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: IJwtPayload): Promise<User>;
}
export {};
