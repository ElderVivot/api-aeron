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
exports.AccessPortalsService = void 0;
const crypt_1 = require("../../../common/adapters/crypt");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const common_1 = require("@nestjs/common");
const access_portals_entity_1 = require("./access_portals.entity");
const access_portals_repository_1 = require("./access_portals.repository");
let AccessPortalsService = class AccessPortalsService {
    constructor(repository) {
        this.repository = repository;
        this.cryptImplementation = (0, crypt_1.makeCryptImplementation)();
    }
    async index(dto, tenant) {
        try {
            const indexData = await this.repository.index(dto, tenant);
            if (indexData instanceof make_error_request_response_1.ErrorRequestResponse)
                throw indexData;
            const indexCountWithoutFilterPage = await this.repository.indexCountWithoutFilterPage(dto, tenant);
            if (indexCountWithoutFilterPage instanceof make_error_request_response_1.ErrorRequestResponse)
                throw indexCountWithoutFilterPage;
            return { data: indexData, count: indexCountWithoutFilterPage.count };
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.accessPortals`, 'index', __filename, error);
        }
    }
    async show(idAccessPortals, tenant) {
        return await this.repository.show(idAccessPortals, tenant);
    }
    async showWithDecryptPassword(idAccessPortals, tenant) {
        try {
            const accessPortals = await this.show(idAccessPortals, tenant);
            if (accessPortals instanceof make_error_request_response_1.ErrorRequestResponse)
                throw accessPortals;
            accessPortals.passwordDecrypt = this.cryptImplementation.decrypt(accessPortals.password);
            return accessPortals;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.accessPortals`, 'showWithDecryptPassword', __filename, error);
        }
    }
    async store(dto, tenant) {
        try {
            let accessPortals = new access_portals_entity_1.AccessPortals();
            accessPortals.createdAt = new Date();
            accessPortals.updatedAt = new Date();
            accessPortals = Object.assign(accessPortals, dto);
            accessPortals.password = this.cryptImplementation.encrypt(dto.password);
            const listAlreadyAccessPortals = await this.index({
                idTypeAccessPortals: dto.idTypeAccessPortals,
                login: dto.login
            }, tenant);
            if (listAlreadyAccessPortals instanceof make_error_request_response_1.ErrorRequestResponse)
                throw listAlreadyAccessPortals;
            if (listAlreadyAccessPortals && listAlreadyAccessPortals.data.length > 0) {
                const idAccessPortals = listAlreadyAccessPortals[0].idAccessPortals;
                accessPortals.status = 'ACTIVE';
                await this.update(idAccessPortals, accessPortals, tenant);
                return this.show(idAccessPortals, tenant);
            }
            else {
                return await this.repository.store(accessPortals, tenant);
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.accessPortals`, 'store', __filename, error);
        }
    }
    async destroy(idAccessPortals, tenant) {
        try {
            const accessPortals = await this.show(idAccessPortals, tenant);
            if (accessPortals instanceof make_error_request_response_1.ErrorRequestResponse)
                throw accessPortals;
            return await this.repository.destroy(idAccessPortals, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.accessPortals`, 'destroy', __filename, error);
        }
    }
    async update(idAccessPortals, dto, tenant) {
        try {
            let accessPortals = await this.show(idAccessPortals, tenant);
            if (accessPortals instanceof make_error_request_response_1.ErrorRequestResponse)
                throw accessPortals;
            if (accessPortals.password !== dto.password) {
                dto.password = this.cryptImplementation.encrypt(dto.password);
            }
            accessPortals = Object.assign(accessPortals, dto);
            accessPortals.updatedAt = new Date();
            await this.repository.update(accessPortals, tenant);
            return await this.show(idAccessPortals, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.accessPortals`, 'update', __filename, error);
        }
    }
    async updateDataAboutPasswordIncorrect(idAccessPortals, tenant) {
        try {
            const accessPortals = await this.show(idAccessPortals, tenant);
            if (accessPortals instanceof make_error_request_response_1.ErrorRequestResponse)
                throw accessPortals;
            const timestampPasswordIncorrect = new Date();
            await this.repository.updateDataAboutPasswordIncorrect(idAccessPortals, tenant, timestampPasswordIncorrect);
            return await this.show(idAccessPortals, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.accessPortals`, 'update', __filename, error);
        }
    }
};
AccessPortalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [access_portals_repository_1.AccessPortalsRepository])
], AccessPortalsService);
exports.AccessPortalsService = AccessPortalsService;
//# sourceMappingURL=access_portals.service.js.map