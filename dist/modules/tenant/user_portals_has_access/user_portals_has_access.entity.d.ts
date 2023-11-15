import { TTypeStatusAccess } from './types/status-access';
export declare class UserPortalsHasAccess {
    idUserPortalsHasAccess: string;
    idTypeAccessPortals: string;
    idAccessPortals: string;
    idCertificate: string;
    createdAt: Date;
    updatedAt: Date;
    nameCompanie: string;
    status: TTypeStatusAccess;
    dateStartAccess: Date;
    dateEndAccess: Date;
    stateRegistration: string;
    cityRegistration: string;
    federalRegistration: string;
    nameCity: string;
    constructor();
}
