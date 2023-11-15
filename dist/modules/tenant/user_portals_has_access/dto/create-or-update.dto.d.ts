import { TTypeStatusAccess } from '../types/status-access';
export declare class CreateOrUpdateDto {
    idTypeAccessPortals: string;
    idAccessPortals: string;
    idCertificate: string;
    nameCompanie: string;
    status: TTypeStatusAccess;
    stateRegistration: string;
    cityRegistration: string;
    federalRegistration: string;
    nameCity: string;
    dateStartAccess: Date;
    dateEndAccess: Date;
}
