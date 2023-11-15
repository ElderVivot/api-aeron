import { TTypeStatusAccess } from './types/status-access';
export declare class AccessPortals {
    idAccessPortals: string;
    idTypeAccessPortals: string;
    createdAt: Date;
    updatedAt: Date;
    nameAccess: string;
    login: string;
    password: string;
    status: TTypeStatusAccess;
    timestampPasswordIncorrect: Date;
    passwordDecrypt?: string;
    constructor();
}
