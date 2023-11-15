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
exports.UserPortalsHasAccessRepository = void 0;
const make_deleted_success_1 = require("../../../common/factories/make-deleted-success");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
let UserPortalsHasAccessRepository = class UserPortalsHasAccessRepository {
    constructor(connection) {
        this.connection = connection;
    }
    async index(dto, tenant) {
        const { cityRegistration, federalRegistration, idAccessPortals, stateRegistration, status, idTypeAccessPortals, idCertificate } = dto;
        try {
            let sql = `
                SELECT user_portals_has_access.*
                FROM "${tenant}".user_portals_has_access AS user_portals_has_access
                WHERE user_portals_has_access."idUserPortalsHasAccess" IS NOT NULL
            `;
            if (cityRegistration)
                sql = sql + 'AND "cityRegistration" = $<cityRegistration>';
            if (federalRegistration)
                sql = sql + 'AND "federalRegistration" = $<federalRegistration>';
            if (idAccessPortals)
                sql = sql + 'AND "idAccessPortals" = $<idAccessPortals>';
            if (stateRegistration)
                sql = sql + 'AND "stateRegistration" = $<stateRegistration>';
            if (status)
                sql = sql + 'AND "status" = $<status>';
            if (idTypeAccessPortals)
                sql = sql + 'AND "idTypeAccessPortals" = $<idTypeAccessPortals>';
            if (idCertificate)
                sql = sql + 'AND "idCertificate" = $<idCertificate>';
            const result = await this.connection.query(sql, dto);
            const clients = result;
            return clients;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.user_portals_has_access`, 'index', __filename, error);
        }
    }
    async show(idUserPortalsHasAccess, tenant) {
        try {
            const sql = `
                SELECT user_portals_has_access.*
                FROM "${tenant}".user_portals_has_access AS user_portals_has_access
                WHERE "idUserPortalsHasAccess" = $<idUserPortalsHasAccess>
            `;
            const result = await this.connection.query(sql, { idUserPortalsHasAccess });
            if (!result || result.length === 0)
                throw new common_1.NotFoundException(`UserPortalsHasAccess with ID ${idUserPortalsHasAccess} not found`);
            const client = result[0];
            return client;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.user_portals_has_access`, 'show', __filename, error);
        }
    }
    async store(userPortalsHasAccess, tenant) {
        try {
            const sql = `
                INSERT INTO "${tenant}".user_portals_has_access("idUserPortalsHasAccess", "idTypeAccessPortals", "idAccessPortals", "idCertificate", "createdAt", "updatedAt", 
                            "nameCompanie", "status",  "stateRegistration", "cityRegistration", "federalRegistration", "nameCity", "dateStartAccess", "dateEndAccess")
                VALUES ($<idUserPortalsHasAccess>, $<idTypeAccessPortals>, $<idAccessPortals>, $<idCertificate>, $<createdAt>, $<updatedAt>, $<nameCompanie>, $<status>, $<stateRegistration>, 
                        $<cityRegistration>, $<federalRegistration>, $<nameCity>, $<dateStartAccess>, $<dateEndAccess>)
                RETURNING "idUserPortalsHasAccess"
            `;
            const result = await this.connection.one(sql, { ...userPortalsHasAccess });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.user_portals_has_access`, 'store', __filename, error);
        }
    }
    async update(userPortalsHasAccess, tenant) {
        try {
            const sql = `
                UPDATE "${tenant}".user_portals_has_access
                SET "updatedAt" = $<updatedAt>, "idTypeAccessPortals" = $<idTypeAccessPortals>, "idAccessPortals" = $<idAccessPortals>, "idCertificate" = $<idCertificate>,   
                    "nameCompanie" = $<nameCompanie>, "status" = $<status>, "stateRegistration" = $<stateRegistration>, "cityRegistration" = $<cityRegistration>, 
                    "federalRegistration" = $<federalRegistration>, "nameCity" = $<nameCity>, "dateStartAccess" = $<dateStartAccess>, "dateEndAccess" = $<dateEndAccess>
                WHERE "idUserPortalsHasAccess" = $<idUserPortalsHasAccess>
            `;
            await this.connection.result(sql, { ...userPortalsHasAccess });
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.user_portals_has_access`, 'update', __filename, error);
        }
    }
    async destroy(idUserPortalsHasAccess, tenant) {
        try {
            const sql = `
                DELETE
                FROM "${tenant}".user_portals_has_access AS user_portals_has_access
                WHERE user_portals_has_access."idUserPortalsHasAccess" = $<idUserPortalsHasAccess>
            `;
            const result = await this.connection.result(sql, { idUserPortalsHasAccess });
            if (result.rowCount) {
                return (0, make_deleted_success_1.MakeDeleteResult)(`${tenant}.user_portals_has_access`, idUserPortalsHasAccess);
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.user_portals_has_access`, 'destroy', __filename, error);
        }
    }
};
UserPortalsHasAccessRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection])
], UserPortalsHasAccessRepository);
exports.UserPortalsHasAccessRepository = UserPortalsHasAccessRepository;
//# sourceMappingURL=user_portals_has_access.repository.js.map