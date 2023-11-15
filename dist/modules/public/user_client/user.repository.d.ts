import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { Connection } from '@database/connection';
import { GetUserDto } from './dto/get-user.dto';
import { ShowUserDto } from './dto/show-user.dto';
import { IUser } from './interfaces/user';
import { IUserList } from './interfaces/user-list';
import { UserClientPermissions } from './user-permissions.entity';
import { User } from './user.entity';
export declare class UserRepository {
    private connection;
    constructor(connection: Connection);
    index(idClient: string, getUserDto: GetUserDto): Promise<IUserList[] | ErrorRequestResponse>;
    getUserPermissions(idUser: string): Promise<UserClientPermissions[] | ErrorRequestResponse>;
    getListUsername(username: string): Promise<string[] | ErrorRequestResponse>;
    show(dto: ShowUserDto): Promise<User | ErrorRequestResponse>;
    store(user: User): Promise<User | ErrorRequestResponse>;
    addPermissions(user: UserClientPermissions): Promise<UserClientPermissions | ErrorRequestResponse>;
    updatePermissions(user: UserClientPermissions): Promise<null | ErrorRequestResponse>;
    confirmRegistration(idUser: string, user: User): Promise<IUser | ErrorRequestResponse>;
    update(idUser: string, user: User): Promise<IUser | ErrorRequestResponse>;
    delete(idUser: string): Promise<string | ErrorRequestResponse>;
    updatePassword(idUser: string, password: string): Promise<IUser | ErrorRequestResponse>;
}
