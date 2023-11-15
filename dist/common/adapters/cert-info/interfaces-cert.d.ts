import pem from 'pem';
export interface IPkcs12ReadResult {
    key: string;
    cert: string;
    ca: string[];
}
export interface ICertInfo extends pem.CertificateSubjectReadResult {
    country: string;
    state: string;
    locality: string;
    organization: string;
    organizationUnit: string;
    commonName: string;
    emailAddress: string;
    san: {
        dns: string[];
        ip: string[];
        email: string[];
    };
    validity: {
        start: number;
        end: number;
    };
    signatureAlgorithm: string;
    publicKeySize: string;
    publicKeyAlgorithm: string;
    issuer: {
        country: string;
        state: string;
        locality: string;
        organization: string;
        organizationUnit: string;
        commonName: string;
        dc: string;
    };
    serial: string;
    eCpfOrCnpj: 'eCPF' | 'eCNPJ';
    federalRegistration: string;
    nameCert: string;
}
