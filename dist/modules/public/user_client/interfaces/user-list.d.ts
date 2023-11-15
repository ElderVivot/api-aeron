import { User } from '../user.entity';
export declare type IUserList = Omit<User, 'password' | 'id' | 'clients'>;
