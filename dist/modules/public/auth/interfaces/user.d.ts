export interface IClientsUserHaveAccess {
    idUser: string;
    username: string;
    idClient: string;
    name: string;
    federalRegistration: string;
    status: string;
    modules: string;
}
export interface IUserPermissions {
    idUserPermissions: string;
    idUser: string;
    updatedAt: Date;
    functionality: string;
    permissions: string;
}
export interface IUserAuth {
    idUser: string;
    username: string;
    active: boolean;
    confirmedRegistration: boolean;
    email: string;
    name: string;
    nickName: string;
    dddPhone: number;
    phone: string;
    departaments: string;
    isUserMain: boolean;
    roles?: IUserPermissions[];
    clientsUserHaveAccess?: IClientsUserHaveAccess[];
}
