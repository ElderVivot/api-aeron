import { EClientStatus } from '../enums/e-client-status';
import { ETypeFederalRegistration } from '../enums/e-type-federal-registration';
export declare class CreateOrUpdateClientDto {
    name: string;
    nickName?: string;
    typeFederalRegistration: ETypeFederalRegistration;
    federalRegistration: string;
    dddPhone?: number;
    phone?: string;
    email?: string;
    idIbgeCity: number;
    neighborhood?: string;
    street?: string;
    zipCode?: string;
    complement?: string;
    referency?: string;
    status?: EClientStatus;
    dateAsClient: string;
}
