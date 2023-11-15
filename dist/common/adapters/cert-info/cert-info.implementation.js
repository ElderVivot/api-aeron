"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertInfoImplementation = void 0;
const pem_1 = __importDefault(require("pem"));
const util_1 = __importDefault(require("util"));
const make_error_request_response_1 = require("../../factories/make-error-request-response");
const readPkcs12Async = util_1.default.promisify((bufferOrPath, options, cb) => pem_1.default.readPkcs12(bufferOrPath, options, (err, result) => cb(err, result)));
const readCertInfoAsyn = util_1.default.promisify((certificate, cb) => pem_1.default.readCertificateInfo(certificate, (err, result) => cb(err, result)));
class CertInfoImplementation {
    constructor(file, password) {
        this.file = file;
        this.password = password;
    }
    getIfECpfCnpj() {
        try {
            const organizationUnit = Array.from(this.certInfo.organizationUnit);
            if (organizationUnit.length > 0) {
                const eCpfOrCnpj = organizationUnit.filter(text => text.toUpperCase().indexOf('CPF') >= 0 || text.toUpperCase().indexOf('CNPJ') >= 0);
                if (!eCpfOrCnpj || eCpfOrCnpj.length === 0)
                    this.certInfo.eCpfOrCnpj = 'eCNPJ';
                else if (eCpfOrCnpj[0].indexOf('CPF') >= 0)
                    this.certInfo.eCpfOrCnpj = 'eCPF';
                else
                    this.certInfo.eCpfOrCnpj = 'eCNPJ';
            }
        }
        catch (error) {
            this.certInfo.eCpfOrCnpj = 'eCNPJ';
        }
    }
    getNameCertAndFederalRegistration() {
        const commonName = this.certInfo.commonName.split(':');
        this.certInfo.nameCert = commonName[0];
        this.certInfo.federalRegistration = commonName[1];
    }
    async readPkcs12() {
        try {
            return await readPkcs12Async(this.file.buffer, { p12Password: this.password });
        }
        catch (error) {
            if (error.toString().indexOf('invalid password') >= 0) {
                return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('common/adapters/cert-info', 'readPkcs12', __filename, 'Invalid password certificate');
            }
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('common/adapters/cert-info', 'readPkcs12', __filename, error);
        }
    }
    async readCertificateInfo() {
        try {
            const certPkcs12 = await this.readPkcs12();
            if (certPkcs12 instanceof make_error_request_response_1.ErrorRequestResponse)
                throw certPkcs12;
            const certInfoCert = await readCertInfoAsyn(certPkcs12.cert);
            if (certPkcs12.ca.length === 0 || certInfoCert.commonName.indexOf(':') >= 0)
                this.certInfo = certInfoCert;
            else {
                for (const ca of certPkcs12.ca) {
                    const certInfoCA = await readCertInfoAsyn(ca);
                    if (Array.from(certInfoCA === null || certInfoCA === void 0 ? void 0 : certInfoCA.organizationUnit).length > 0 && certInfoCA.commonName.indexOf(':') >= 0) {
                        this.certInfo = certInfoCA;
                        break;
                    }
                }
            }
            this.getIfECpfCnpj();
            this.getNameCertAndFederalRegistration();
            return this.certInfo;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('common/adapters/cert-info', 'readCertificateInfo', __filename, error);
        }
    }
}
exports.CertInfoImplementation = CertInfoImplementation;
//# sourceMappingURL=cert-info.implementation.js.map