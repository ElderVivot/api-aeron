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
exports.UserPortalsHasAccessService = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const common_1 = require("@nestjs/common");
const user_portals_has_access_entity_1 = require("./user_portals_has_access.entity");
const user_portals_has_access_repository_1 = require("./user_portals_has_access.repository");
let UserPortalsHasAccessService = class UserPortalsHasAccessService {
    constructor(repository) {
        this.repository = repository;
    }
    async getIdUserPortalsHasAccess(dto, tenant) {
        const { cityRegistration, federalRegistration, idAccessPortals, stateRegistration, idTypeAccessPortals, idCertificate } = dto;
        const userPortalsHasAccess = await this.repository.index({
            idTypeAccessPortals,
            cityRegistration,
            stateRegistration,
            federalRegistration,
            idAccessPortals,
            idCertificate
        }, tenant);
        if (userPortalsHasAccess instanceof make_error_request_response_1.ErrorRequestResponse)
            return '';
        if (userPortalsHasAccess.length === 0)
            return '';
        const idUserPortalsHasAccess = userPortalsHasAccess[0].idUserPortalsHasAccess;
        return idUserPortalsHasAccess;
    }
    async index(dto, tenant) {
        try {
            return await this.repository.index(dto, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.user_portals_has_access`, 'index', __filename, error);
        }
    }
    async show(idUserPortalsHasAccess, tenant) {
        return await this.repository.show(idUserPortalsHasAccess, tenant);
    }
    async store(dto, tenant) {
        try {
            const idUserPortalsHasAccessAlreadyExist = await this.getIdUserPortalsHasAccess(dto, tenant);
            if (idUserPortalsHasAccessAlreadyExist)
                return await this.update(idUserPortalsHasAccessAlreadyExist, dto, tenant);
            let userPortalsHasAccess = new user_portals_has_access_entity_1.UserPortalsHasAccess();
            userPortalsHasAccess.createdAt = new Date();
            userPortalsHasAccess.updatedAt = new Date();
            userPortalsHasAccess = Object.assign(userPortalsHasAccess, dto);
            userPortalsHasAccess.idCertificate = userPortalsHasAccess.idCertificate ? userPortalsHasAccess.idCertificate : null;
            userPortalsHasAccess.idAccessPortals = userPortalsHasAccess.idAccessPortals ? userPortalsHasAccess.idAccessPortals : null;
            return await this.repository.store(userPortalsHasAccess, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.user_portals_has_access`, 'store', __filename, error);
        }
    }
    async destroy(idUserPortalsHasAccess, tenant) {
        try {
            const userPortalsHasAccess = await this.show(idUserPortalsHasAccess, tenant);
            if (userPortalsHasAccess instanceof make_error_request_response_1.ErrorRequestResponse)
                throw userPortalsHasAccess;
            return await this.repository.destroy(idUserPortalsHasAccess, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.user_portals_has_access`, 'destroy', __filename, error);
        }
    }
    async update(idUserPortalsHasAccess, dto, tenant) {
        try {
            let userPortalsHasAccess = await this.show(idUserPortalsHasAccess, tenant);
            if (userPortalsHasAccess instanceof make_error_request_response_1.ErrorRequestResponse)
                throw userPortalsHasAccess;
            userPortalsHasAccess = Object.assign(userPortalsHasAccess, dto);
            userPortalsHasAccess.updatedAt = new Date();
            await this.repository.update(userPortalsHasAccess, tenant);
            return await this.show(idUserPortalsHasAccess, tenant);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.user_portals_has_access`, 'update', __filename, error);
        }
    }
};
UserPortalsHasAccessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_portals_has_access_repository_1.UserPortalsHasAccessRepository])
], UserPortalsHasAccessService);
exports.UserPortalsHasAccessService = UserPortalsHasAccessService;
//# sourceMappingURL=user_portals_has_access.service.js.map