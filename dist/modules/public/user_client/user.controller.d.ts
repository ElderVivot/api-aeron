import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IResultGenericResponse } from '@common/interfaces/result-generic-response';
import { ConfirmRegistrationDto } from './dto/confirm-registration.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { ResetPasswordDto } from './dto/reset-password';
import { ShowUserDto } from './dto/show-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user';
import { IUserList } from './interfaces/user-list';
import { ResetPassword } from './reset-password.entity';
import { User } from './user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private service;
    constructor(service: UserService);
    index(idClient: string, dto: GetUserDto): Promise<IUserList[] | ErrorRequestResponse>;
    getListUsername(username: string): Promise<string[] | ErrorRequestResponse>;
    store(createUserDto: CreateUserDto): Promise<User | ErrorRequestResponse>;
    show(showUserDto: ShowUserDto): Promise<User | ErrorRequestResponse>;
    showWithId(id: string): Promise<User | ErrorRequestResponse>;
    confirmRegistration(id: string, dto: ConfirmRegistrationDto): Promise<IUser | ErrorRequestResponse>;
    update(id: string, dto: UpdateUserDto): Promise<IUser | ErrorRequestResponse>;
    sendInformationToResetPassword(username: string): Promise<Pick<ResetPassword, 'idResetPassword'> | ErrorRequestResponse>;
    resetPassword(idResetPassword: string, dto: ResetPasswordDto): Promise<IResultGenericResponse | ErrorRequestResponse>;
}
