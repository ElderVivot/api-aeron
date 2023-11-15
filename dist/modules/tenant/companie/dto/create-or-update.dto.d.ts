import { ETypeFederalRegistration } from '@common/enums/e-type-federal-registration';
import { ECompanieStatus } from '../types/e-companie-status';
export declare class CreateOrUpdateDto {
    codeCompanieAccountSystem: string;
    name: string;
    nickName?: string;
    typeFederalRegistration: ETypeFederalRegistration;
    federalRegistration: string;
    stateRegistration: string;
    cityRegistration: string;
    dddPhone?: number;
    phone?: string;
    email?: string;
    idIbgeCity: number;
    neighborhood?: string;
    street?: string;
    zipCode?: string;
    complement?: string;
    referency?: string;
    status?: ECompanieStatus;
    dateInicialAsCompanie?: string;
    dateInicialAsClient?: string;
    dateFinalAsClient?: string;
    cnaes?: string;
    taxRegime?: '01' | '02' | '03' | '99';
}
