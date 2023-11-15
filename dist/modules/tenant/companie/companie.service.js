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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanieService = void 0;
const date_factory_1 = require("../../../common/adapters/date/date-factory");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const convert_string_to_list_1 = require("../../../common/utils/convert-string-to-list");
const city_repository_1 = require("../../public/city/city.repository");
const common_1 = require("@nestjs/common");
const companie_entity_1 = require("./companie.entity");
const companie_repository_1 = require("./companie.repository");
const e_companie_status_1 = require("./types/e-companie-status");
let CompanieService = class CompanieService {
    constructor(repository, cityRepository) {
        this.repository = repository;
        this.cityRepository = cityRepository;
        this.dateImplementation = (0, date_factory_1.makeDateImplementation)();
    }
    async getIdCity(idIbgeCity) {
        const cities = await this.cityRepository.index({ idIbge: idIbgeCity });
        if (cities instanceof make_error_request_response_1.ErrorRequestResponse || !cities.length) {
            return 1;
        }
        const city = cities[0];
        return city.id_city;
    }
    async getIdCompanie(dto, tenant) {
        const { codeCompanieAccountSystem } = dto;
        const companie = await this.repository.index({
            codeCompanieAccountSystem
        }, tenant);
        if (companie instanceof make_error_request_response_1.ErrorRequestResponse)
            return '';
        if (companie.length === 0)
            return '';
        const idCompanie = companie[0].idCompanie;
        return idCompanie;
    }
    async index(dto, tenant) {
        try {
            dto.codeCompanies = (0, convert_string_to_list_1.convertStringToListString)(dto.codeCompanies);
            const indexData = await this.repository.index(dto, tenant);
            if (indexData instanceof make_error_request_response_1.ErrorRequestResponse)
                throw indexData;
            const indexCountWithoutFilterPage = await this.repository.indexCountWithoutFilterPage(dto, tenant);
            if (indexCountWithoutFilterPage instanceof make_error_request_response_1.ErrorRequestResponse)
                throw indexCountWithoutFilterPage;
            return { data: indexData, count: indexCountWithoutFilterPage.count };
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.companie`, 'index', __filename, error);
        }
    }
    async indexOnlyIDCompanie(dto, tenant) {
        try {
            dto.codeCompanies = (0, convert_string_to_list_1.convertStringToListString)(dto.codeCompanies);
            let listIdCompanie = '';
            const indexData = await this.repository.indexOnlyIDCompanie(dto, tenant);
            if (indexData instanceof make_error_request_response_1.ErrorRequestResponse)
                throw indexData;
            for (const [idx, companie] of indexData.entries()) {
                const comma = idx === indexData.length - 1 ? '' : ',';
                listIdCompanie = listIdCompanie + companie.idCompanie + comma;
            }
            const indexCountWithoutFilterPage = await this.repository.indexOnlyIDCompanieCount(dto, tenant);
            if (indexCountWithoutFilterPage instanceof make_error_request_response_1.ErrorRequestResponse)
                throw indexCountWithoutFilterPage;
            return { data: { listIdCompanie }, count: indexCountWithoutFilterPage.count };
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.companie`, 'index', __filename, error);
        }
    }
    async show(idCompanie, tenant) {
        return await this.repository.show(idCompanie, tenant);
    }
    async store(dto, tenant) {
        try {
            const idCompanieAlreadyExist = await this.getIdCompanie(dto, tenant);
            if (idCompanieAlreadyExist)
                return await this.update(idCompanieAlreadyExist, dto, tenant);
            let companie = new companie_entity_1.Companie();
            companie.createdAt = new Date();
            companie.updatedAt = new Date();
            companie = Object.assign(companie, dto);
            companie.nickName = companie.nickName || companie.name.split(' ')[0];
            companie.dateInicialAsCompanie = this.dateImplementation.zonedTimeToUtc(companie.dateInicialAsCompanie, 'America/Sao_Paulo');
            companie.dateInicialAsClient = this.dateImplementation.zonedTimeToUtc(companie.dateInicialAsClient, 'America/Sao_Paulo');
            companie.dateFinalAsClient = this.dateImplementation.zonedTimeToUtc(companie.dateFinalAsClient, 'America/Sao_Paulo');
            companie.idCity = await this.getIdCity(dto.idIbgeCity);
            if (!companie.status)
                companie.status = e_companie_status_1.ECompanieStatus.ACTIVE;
            return await this.repository.store(companie, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.companie`, 'store', __filename, error);
        }
    }
    async destroy(idCompanie, tenant) {
        try {
            const client = await this.show(idCompanie, tenant);
            if (client instanceof make_error_request_response_1.ErrorRequestResponse)
                throw client;
            return await this.repository.destroy(idCompanie, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.companie`, 'destroy', __filename, error);
        }
    }
    async update(idCompanie, dto, tenant) {
        try {
            let companie = await this.show(idCompanie, tenant);
            if (companie instanceof make_error_request_response_1.ErrorRequestResponse)
                throw companie;
            companie = Object.assign(companie, dto);
            companie.updatedAt = new Date();
            companie.idCity = await this.getIdCity(dto.idIbgeCity);
            await this.repository.update(companie, tenant);
            return await this.show(idCompanie, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.companie`, 'update', __filename, error);
        }
    }
};
CompanieService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [companie_repository_1.CompanieRepository,
        city_repository_1.CityRepository])
], CompanieService);
exports.CompanieService = CompanieService;
//# sourceMappingURL=companie.service.js.map