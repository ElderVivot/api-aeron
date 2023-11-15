import { ETypeFederalRegistration } from '@common/enums/e-type-federal-registration';
import { ECompanieStatus } from '../types/e-companie-status';
export declare class FilterDto {
    _page?: string;
    _limit?: string;
    status?: ECompanieStatus;
    name?: string;
    typeFederalRegistration?: ETypeFederalRegistration;
    federalRegistration?: string;
    federalRegistrationPartial?: string;
    codeCompanieAccountSystem?: string;
    cityRegistration?: string;
    idRoutine?: string;
    codeCompanies?: string;
    existEmployees?: string;
}
