export declare class Certificate {
    idCertificate: string;
    createdAt: Date;
    updatedAt: Date;
    password: string;
    commomName: string;
    startDateValidity: Date;
    endDateValidity: Date;
    nameCert: string;
    federalRegistration: string;
    eCpfCnpj: 'eCPF' | 'eCNPJ';
    urlSaved: string;
    hasProcurationEcac: boolean;
    passwordDecrypt?: string;
    constructor();
}
