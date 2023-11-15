export declare class UserClientPermissionsDto {
    idUserPermissions?: string;
    functionality: string;
    permissions: string;
}
export declare class UpdateUserDto {
    active: boolean;
    email: string;
    name: string;
    nickName?: string;
    dddPhone?: number;
    phone?: string;
    departaments?: string;
    isUserMain?: boolean;
    dataListPermissions?: UserClientPermissionsDto[];
}
