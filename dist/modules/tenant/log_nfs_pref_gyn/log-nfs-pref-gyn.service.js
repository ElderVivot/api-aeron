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
exports.LogNfsPrefGynService = void 0;
const s3_1 = require("../../../common/aws/s3/s3");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const convert_string_to_list_1 = require("../../../common/utils/convert-string-to-list");
const companie_repository_1 = require("../companie/companie.repository");
const common_1 = require("@nestjs/common");
const log_nfs_pref_gyn_entity_1 = require("./log-nfs-pref-gyn.entity");
const log_nfs_pref_gyn_repository_1 = require("./log-nfs-pref-gyn.repository");
let LogNfsPrefGynService = class LogNfsPrefGynService {
    constructor(awsS3, repository, companieRepository) {
        this.awsS3 = awsS3;
        this.repository = repository;
        this.companieRepository = companieRepository;
    }
    async getIdCompanie(dto, tenant) {
        let idCompanie = dto.idCompanie;
        const { federalRegistration, codeCompanieAccountSystem, cityRegistration } = dto;
        if (!idCompanie && (federalRegistration || codeCompanieAccountSystem || cityRegistration)) {
            let filter = {};
            if (cityRegistration)
                filter = { cityRegistration };
            if (federalRegistration)
                filter = { federalRegistration };
            if (codeCompanieAccountSystem)
                filter = { codeCompanieAccountSystem };
            const companie = await this.companieRepository.index({ ...filter }, tenant);
            if (companie instanceof make_error_request_response_1.ErrorRequestResponse)
                throw companie;
            if (companie.length === 0)
                return undefined;
            idCompanie = companie[0].idCompanie;
        }
        return idCompanie;
    }
    async index(dto, tenant) {
        try {
            if (dto.federalRegistration || dto.codeCompanieAccountSystem || dto.cityRegistration)
                dto.idCompanie = await this.getIdCompanie(dto, tenant);
            dto.codeCompanies = (0, convert_string_to_list_1.convertStringToListString)(dto.codeCompanies);
            dto.cityRegistrationList = (0, convert_string_to_list_1.convertStringToListString)(dto.cityRegistrationList);
            const indexData = await this.repository.index(dto, tenant);
            if (indexData instanceof make_error_request_response_1.ErrorRequestResponse)
                throw indexData;
            const indexCountWithoutFilterPage = await this.repository.indexCountWithoutFilterPage(dto, tenant);
            if (indexCountWithoutFilterPage instanceof make_error_request_response_1.ErrorRequestResponse)
                throw indexCountWithoutFilterPage;
            return { data: indexData, count: indexCountWithoutFilterPage.count };
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nfs_pref_gyn`, 'index', __filename, error);
        }
    }
    async show(idLogNfsPrefGyn, tenant) {
        return await this.repository.show(idLogNfsPrefGyn, tenant);
    }
    async store(dto, tenant) {
        try {
            const objCityRegestritationOrIdAccessPortals = dto.cityRegistration ? { cityRegistration: dto.cityRegistration } : { idAccessPortals: dto.idAccessPortals };
            const existOtherLogNotFiscal = await this.repository.index({
                dateStartDown: dto.dateStartDown,
                dateEndDown: dto.dateEndDown,
                ...objCityRegestritationOrIdAccessPortals
            }, tenant);
            if (existOtherLogNotFiscal instanceof make_error_request_response_1.ErrorRequestResponse)
                throw existOtherLogNotFiscal;
            if (existOtherLogNotFiscal.length > 0)
                throw new Error('ALREADY EXIST LOG WITH THIS cityRegistration or idAccessPortals, and dateStartDown and dateEndDown');
            let logNotaFiscal = new log_nfs_pref_gyn_entity_1.LogNfsPrefGyn();
            logNotaFiscal.createdAt = new Date();
            logNotaFiscal.updatedAt = logNotaFiscal.createdAt;
            logNotaFiscal.idCompanie = await this.getIdCompanie(dto, tenant);
            logNotaFiscal = Object.assign(logNotaFiscal, dto);
            logNotaFiscal.urlsXmls = dto.urlsXmls || '';
            logNotaFiscal.urlPrintLog = dto.urlPrintLog || '';
            return await this.repository.store(logNotaFiscal, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nfs_pref_gyn`, 'store', __filename, error);
        }
    }
    async update(idLogNfsPrefGyn, dto, tenant) {
        try {
            let logNotaFiscal = await this.show(idLogNfsPrefGyn, tenant);
            if (logNotaFiscal instanceof make_error_request_response_1.ErrorRequestResponse)
                throw logNotaFiscal;
            logNotaFiscal = Object.assign(logNotaFiscal, dto);
            logNotaFiscal.updatedAt = new Date();
            logNotaFiscal.urlsXmls = dto.urlsXmls || '';
            logNotaFiscal.urlPrintLog = dto.urlPrintLog || '';
            await this.repository.update(logNotaFiscal, tenant);
            return await this.show(idLogNfsPrefGyn, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nfs_pref_gyn`, 'update', __filename, error);
        }
    }
    async uploadPrintLog(idLogNfsPrefGyn, bufferImage, tenant) {
        try {
            const logNotaFiscal = await this.show(idLogNfsPrefGyn, tenant);
            if (logNotaFiscal instanceof make_error_request_response_1.ErrorRequestResponse)
                throw logNotaFiscal;
            const resultUpload = await this.awsS3.upload(bufferImage, `${tenant}/log-nota-fiscal`);
            if (resultUpload instanceof make_error_request_response_1.ErrorRequestResponse)
                throw resultUpload;
            const { urlPrintLog } = logNotaFiscal;
            if (urlPrintLog) {
                const key = urlPrintLog.split('.com/')[1];
                await this.awsS3.delete(key);
            }
            await this.repository.updateUrlPrintLog(idLogNfsPrefGyn, resultUpload.Location, tenant);
            return await this.show(idLogNfsPrefGyn, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nfs_pref_gyn`, 'uploadPrintLog', __filename, error);
        }
    }
};
LogNfsPrefGynService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AWS_S3')),
    __metadata("design:paramtypes", [s3_1.AwsS3,
        log_nfs_pref_gyn_repository_1.LogNfsPrefGynRepository,
        companie_repository_1.CompanieRepository])
], LogNfsPrefGynService);
exports.LogNfsPrefGynService = LogNfsPrefGynService;
//# sourceMappingURL=log-nfs-pref-gyn.service.js.map