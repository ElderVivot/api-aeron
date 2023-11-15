"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateService = void 0;
const cert_info_implementation_1 = require("../../../common/adapters/cert-info/cert-info.implementation");
const crypt_1 = require("../../../common/adapters/crypt");
const date_factory_1 = require("../../../common/adapters/date/date-factory");
const s3_1 = require("../../../common/aws/s3/s3");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const convert_string_to_list_1 = require("../../../common/utils/convert-string-to-list");
const common_1 = require("@nestjs/common");
const certificate_entity_1 = require("./certificate.entity");
const certificate_repository_1 = require("./certificate.repository");
let CertificateService = class CertificateService {
    constructor(awsS3, repository) {
        this.awsS3 = awsS3;
        this.repository = repository;
        this.dateImplementation = (0, date_factory_1.makeDateImplementation)();
        this.cryptImplementation = (0, crypt_1.makeCryptImplementation)();
    }
    async readCertificateInfo(dto) {
        const { file, password } = dto;
        this.certInfoImplementation = new cert_info_implementation_1.CertInfoImplementation(file, password);
        return await this.certInfoImplementation.readCertificateInfo();
    }
    async loadFieldsCertificate(dto) {
        const certificateInfo = await this.readCertificateInfo(dto);
        if (certificateInfo instanceof make_error_request_response_1.ErrorRequestResponse)
            throw certificateInfo;
        const commomName = certificateInfo.commonName;
        const password = this.cryptImplementation.encrypt(dto.password);
        const nameCert = certificateInfo.nameCert;
        const federalRegistration = certificateInfo.federalRegistration;
        const eCpfCnpj = certificateInfo.eCpfOrCnpj;
        const startDateValidity = this.dateImplementation.zonedTimeToUtc(certificateInfo.validity.start, 'America/Sao_Paulo');
        const endDateValidity = this.dateImplementation.zonedTimeToUtc(certificateInfo.validity.end, 'America/Sao_Paulo');
        return { commomName, password, nameCert, federalRegistration, eCpfCnpj, startDateValidity, endDateValidity };
    }
    async index(dto, tenant) {
        try {
            return await this.repository.index(dto, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'index', __filename, error);
        }
    }
    async getListCertificateNotOverdue(dto, tenant) {
        try {
            const listToReturn = [];
            const data = await this.repository.getListCertificateNotOverdue(dto, tenant);
            if (data instanceof make_error_request_response_1.ErrorRequestResponse)
                throw data;
            for (const cert of data) {
                listToReturn.push(cert.federalRegistration);
            }
            return listToReturn;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'getListCertificateNotOverdue', __filename, error);
        }
    }
    async indexToFront(dto, tenant) {
        try {
            dto.codeCompanies = (0, convert_string_to_list_1.convertStringToListString)(dto.codeCompanies);
            const indexData = await this.repository.indexToFront(dto, tenant);
            if (indexData instanceof make_error_request_response_1.ErrorRequestResponse)
                throw indexData;
            const indexCountWithoutFilterPage = await this.repository.indexToFrontWithoutFilterPage(dto, tenant);
            if (indexCountWithoutFilterPage instanceof make_error_request_response_1.ErrorRequestResponse)
                throw indexCountWithoutFilterPage;
            return { data: indexData, count: indexCountWithoutFilterPage.count };
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'indexToFront', __filename, error);
        }
    }
    async show(idCertificate, tenant) {
        return await this.repository.show(idCertificate, tenant);
    }
    async showWithDecryptPassword(idCertificate, tenant) {
        try {
            const certificate = await this.show(idCertificate, tenant);
            if (certificate instanceof make_error_request_response_1.ErrorRequestResponse)
                throw certificate;
            certificate.passwordDecrypt = this.cryptImplementation.decrypt(certificate.password);
            return certificate;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'showWithDecryptPassword', __filename, error);
        }
    }
    async store(dto, tenant) {
        try {
            let certificate = new certificate_entity_1.Certificate();
            certificate.createdAt = new Date();
            certificate.updatedAt = new Date();
            const certificateInfo = await this.loadFieldsCertificate(dto);
            certificate = Object.assign(certificate, certificateInfo);
            certificate.hasProcurationEcac = certificate.hasProcurationEcac || false;
            const extensionFileSplit = dto.file.originalname.split('.');
            const extensionFile = extensionFileSplit[extensionFileSplit.length - 1];
            const listAlreadyCertificate = await this.index({ federalRegistration: certificate.federalRegistration }, tenant);
            if (listAlreadyCertificate instanceof make_error_request_response_1.ErrorRequestResponse)
                throw listAlreadyCertificate;
            if (listAlreadyCertificate.length > 0) {
                const alreadyCertificate = listAlreadyCertificate[0];
                if (alreadyCertificate.endDateValidity > new Date())
                    throw new Error('CERTIFICATE_IS_NOT_OVERDUE');
                certificate.idCertificate = alreadyCertificate.idCertificate;
                const { urlSaved } = alreadyCertificate;
                if (urlSaved) {
                    const key = urlSaved.split('.com/')[1];
                    await this.awsS3.delete(key);
                }
                const resultUpload = await this.awsS3.upload(dto.file.buffer, `${tenant}/certificate`, extensionFile, 'application/pkcs12');
                if (resultUpload instanceof make_error_request_response_1.ErrorRequestResponse)
                    throw resultUpload;
                certificate.urlSaved = resultUpload.Location;
                await this.repository.update(certificate, tenant);
                return await this.show(certificate.idCertificate, tenant);
            }
            else {
                const resultUpload = await this.awsS3.upload(dto.file.buffer, `${tenant}/certificate`, extensionFile, 'application/pkcs12');
                if (resultUpload instanceof make_error_request_response_1.ErrorRequestResponse)
                    throw resultUpload;
                certificate.urlSaved = resultUpload.Location;
                return await this.repository.store(certificate, tenant);
            }
        }
        catch (error) {
            console.log({ tenant, ...dto });
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'store', __filename, error);
        }
    }
    async destroy(idCertificate, tenant) {
        try {
            const certificate = await this.show(idCertificate, tenant);
            if (certificate instanceof make_error_request_response_1.ErrorRequestResponse)
                throw certificate;
            const { urlSaved } = certificate;
            if (urlSaved) {
                const key = urlSaved.split('.com/')[1];
                await this.awsS3.delete(key);
            }
            return await this.repository.destroy(idCertificate, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'destroy', __filename, error);
        }
    }
    async update(idCertificate, dto, tenant) {
        try {
            let certificate = await this.show(idCertificate, tenant);
            if (certificate instanceof make_error_request_response_1.ErrorRequestResponse)
                throw certificate;
            const certificateInfo = await this.loadFieldsCertificate(dto);
            certificate = Object.assign(certificate, certificateInfo);
            certificate.updatedAt = new Date();
            const extensionFileSplit = dto.file.originalname.split('.');
            const extensionFile = extensionFileSplit[extensionFileSplit.length - 1];
            const { urlSaved } = certificate;
            if (urlSaved) {
                const key = urlSaved.split('.com/')[1];
                await this.awsS3.delete(key);
            }
            const resultUpload = await this.awsS3.upload(dto.file.buffer, `${tenant}/certificate`, extensionFile, 'application/pkcs12');
            if (resultUpload instanceof make_error_request_response_1.ErrorRequestResponse)
                throw resultUpload;
            certificate.urlSaved = resultUpload.Location;
            await this.repository.update(certificate, tenant);
            return await this.show(idCertificate, tenant);
        }
        catch (error) {
            console.log({ tenant, ...dto });
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'update', __filename, error);
        }
    }
};
CertificateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AWS_S3')),
    __metadata("design:paramtypes", [s3_1.AwsS3,
        certificate_repository_1.CertificateRepository])
], CertificateService);
exports.CertificateService = CertificateService;
//# sourceMappingURL=certificate.service.js.map