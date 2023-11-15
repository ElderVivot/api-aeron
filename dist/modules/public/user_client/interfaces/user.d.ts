import { User } from '../user.entity';
export declare type IUser = Omit<User, 'password'>;
