export declare class UserClientPermissionsDto {
    functionality: string;
    permissions: string;
}
export declare class CreateUserDto {
    username: string;
    email: string;
    name: string;
    nickName?: string;
    dddPhone?: number;
    phone?: string;
    departaments?: string;
    tenantQueroConhecer?: string;
    isUserMain?: boolean;
    dataListPermissions?: UserClientPermissionsDto[];
}
