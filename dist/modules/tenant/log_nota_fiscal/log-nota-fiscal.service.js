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
exports.LogNotaFiscalService = void 0;
const s3_1 = require("../../../common/aws/s3/s3");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const convert_string_to_list_1 = require("../../../common/utils/convert-string-to-list");
const companie_repository_1 = require("../companie/companie.repository");
const common_1 = require("@nestjs/common");
const log_nota_fiscal_entity_1 = require("./log-nota-fiscal.entity");
const log_nota_fiscal_repository_1 = require("./log-nota-fiscal.repository");
let LogNotaFiscalService = class LogNotaFiscalService {
    constructor(awsS3, repository, companieRepository) {
        this.awsS3 = awsS3;
        this.repository = repository;
        this.companieRepository = companieRepository;
    }
    async getIdCompanie(dto, tenant) {
        let idCompanie = dto.idCompanie;
        const { federalRegistration, codeCompanieAccountSystem } = dto;
        if (!idCompanie && !federalRegistration && !codeCompanieAccountSystem) {
            throw new Error('Its necessary to pass idCompanie, federalRegistration OR codeCompanieAccountSystem to find companie');
        }
        if (!idCompanie && (federalRegistration || codeCompanieAccountSystem)) {
            const companie = await this.companieRepository.index({
                federalRegistration,
                codeCompanieAccountSystem
            }, tenant);
            if (companie instanceof make_error_request_response_1.ErrorRequestResponse)
                throw companie;
            if (companie.length === 0)
                throw new Error('Dont find any companie with this idCompanie, federalRegistration OR codeCompanieAccountSystem');
            idCompanie = companie[0].idCompanie;
        }
        return idCompanie;
    }
    async index(dto, tenant) {
        try {
            return await this.repository.index(dto, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nota_fiscal`, 'index', __filename, error);
        }
    }
    async indexToFront(dto, tenant) {
        try {
            dto.codeCompanies = (0, convert_string_to_list_1.convertStringToListString)(dto.codeCompanies);
            const indexData = await this.repository.indexToFront(dto, tenant);
            if (indexData instanceof make_error_request_response_1.ErrorRequestResponse)
                throw indexData;
            const indexCountWithoutFilterPage = await this.repository.indexToFrontCountWithoutFilterPage(dto, tenant);
            if (indexCountWithoutFilterPage instanceof make_error_request_response_1.ErrorRequestResponse)
                throw indexCountWithoutFilterPage;
            return { data: indexData, count: indexCountWithoutFilterPage.count };
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nota_fiscal`, 'index', __filename, error);
        }
    }
    async show(idLogNotaFiscal, tenant) {
        return await this.repository.show(idLogNotaFiscal, tenant);
    }
    async store(dto, tenant) {
        try {
            dto.typeSearch = dto.typeSearch || 'fractional';
            const idCompanie = await this.getIdCompanie(dto, tenant);
            const existOtherLogNotFiscal = await this.repository.index({
                idCompanie,
                modelNotaFiscal: dto.modelNotaFiscal,
                situationNotaFiscal: dto.situationNotaFiscal,
                typeSearch: dto.typeSearch,
                dateStartDown: dto.dateStartDown,
                dateEndDown: dto.dateEndDown
            }, tenant);
            if (existOtherLogNotFiscal instanceof make_error_request_response_1.ErrorRequestResponse)
                throw existOtherLogNotFiscal;
            if (existOtherLogNotFiscal.length > 0)
                throw new Error('ALREADY EXIST LOG WITH THIS idCompanie, modelNotaFiscal, situationNotaFiscal, dateStartDown and dateEndDown');
            let logNotaFiscal = new log_nota_fiscal_entity_1.LogNotaFiscal();
            logNotaFiscal.createdAt = new Date();
            logNotaFiscal.updatedAt = dto.updatedAt || new Date();
            logNotaFiscal.typeSearch = dto.typeSearch;
            logNotaFiscal.idCompanie = idCompanie;
            logNotaFiscal.urlPrintLog = dto.urlPrintLog || '';
            logNotaFiscal = Object.assign(logNotaFiscal, dto);
            return await this.repository.store(logNotaFiscal, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nota_fiscal`, 'store', __filename, error);
        }
    }
    async update(idLogNotaFiscal, dto, tenant) {
        try {
            dto.typeSearch = dto.typeSearch || 'fractional';
            let logNotaFiscal = await this.show(idLogNotaFiscal, tenant);
            if (logNotaFiscal instanceof make_error_request_response_1.ErrorRequestResponse)
                throw logNotaFiscal;
            logNotaFiscal = Object.assign(logNotaFiscal, dto);
            logNotaFiscal.updatedAt = new Date();
            await this.repository.update(logNotaFiscal, tenant);
            return await this.show(idLogNotaFiscal, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nota_fiscal`, 'update', __filename, error);
        }
    }
    async uploadPrintLog(idLogNotaFiscal, bufferImage, tenant) {
        try {
            const logNotaFiscal = await this.show(idLogNotaFiscal, tenant);
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
            await this.repository.updateUrlPrintLog(idLogNotaFiscal, resultUpload.Location, tenant);
            return await this.show(idLogNotaFiscal, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nota_fiscal`, 'uploadPrintLog', __filename, error);
        }
    }
    async getCompaniesThatDontProcessNotaFiscalYet(dto, tenant) {
        dto.idCompanieList = (0, convert_string_to_list_1.convertStringToListString)(dto.idCompanieList);
        return await this.repository.getCompaniesThatDontProcessNotaFiscalYet(dto, tenant);
    }
};
LogNotaFiscalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AWS_S3')),
    __metadata("design:paramtypes", [s3_1.AwsS3,
        log_nota_fiscal_repository_1.LogNotaFiscalRepository,
        companie_repository_1.CompanieRepository])
], LogNotaFiscalService);
exports.LogNotaFiscalService = LogNotaFiscalService;
//# sourceMappingURL=log-nota-fiscal.service.js.map