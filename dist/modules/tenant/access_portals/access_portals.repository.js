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
exports.AccessPortalsRepository = void 0;
const make_deleted_success_1 = require("../../../common/factories/make-deleted-success");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
let AccessPortalsRepository = class AccessPortalsRepository {
    constructor(connection) {
        this.connection = connection;
    }
    async index(dto, tenant) {
        const { _page, _limit, idTypeAccessPortals, login, nameAccess, status, whatAccesses, getPaswordIncorrect, loginLikeSearch } = dto;
        try {
            let sql = `
                SELECT access_portals.*, type_access_portals."nameTypeAccess"
                FROM "${tenant}".access_portals AS access_portals
                     INNER JOIN public.type_access_portals AS type_access_portals
                          ON    type_access_portals."idTypeAccessPortals" = access_portals."idTypeAccessPortals"
                WHERE access_portals."idAccessPortals" IS NOT NULL
            `;
            if (nameAccess)
                sql = sql + 'AND access_portals."nameAccess" LIKE \'%\' || $<nameAccess> || \'%\'';
            if (login)
                sql = sql + 'AND access_portals."login" = $<login>';
            if (loginLikeSearch)
                sql = sql + 'AND access_portals."login" LIKE \'%\' || $<loginLikeSearch> || \'%\'';
            if (idTypeAccessPortals)
                sql = sql + 'AND access_portals."idTypeAccessPortals" = $<idTypeAccessPortals>';
            if (status)
                sql = sql + 'AND access_portals."status" = $<status>';
            if (whatAccesses)
                sql = sql + 'AND type_access_portals."whatAccesses" = $<whatAccesses>';
            if (getPaswordIncorrect && getPaswordIncorrect === 'no') {
                sql = sql + 'AND ( access_portals."timestampPasswordIncorrect" IS NULL OR access_portals."timestampPasswordIncorrect" < access_portals."updatedAt" )';
            }
            const page = Number(_page);
            const limit = Number(_limit);
            let _offset = 0;
            if (page && limit) {
                if (page > 1)
                    _offset = (page - 1) * limit;
                sql = sql + `
                    LIMIT $<_limit>
                    OFFSET $<_offset>
                `;
            }
            const result = await this.connection.query(sql, { ...dto, _offset });
            const clients = result;
            return clients;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.access_portals`, 'index', __filename, error);
        }
    }
    async indexCountWithoutFilterPage(dto, tenant) {
        const { idTypeAccessPortals, login, nameAccess, status, whatAccesses, getPaswordIncorrect, loginLikeSearch } = dto;
        try {
            let sql = `
                SELECT COUNT(8)
                FROM "${tenant}".access_portals AS access_portals
                     INNER JOIN public.type_access_portals AS type_access_portals
                          ON    type_access_portals."idTypeAccessPortals" = access_portals."idTypeAccessPortals"
                WHERE access_portals."idAccessPortals" IS NOT NULL
            `;
            if (nameAccess)
                sql = sql + 'AND access_portals."nameAccess" LIKE \'%\' || $<nameAccess> || \'%\'';
            if (login)
                sql = sql + 'AND access_portals."login" = $<login>';
            if (loginLikeSearch)
                sql = sql + 'AND access_portals."login" LIKE \'%\' || $<loginLikeSearch> || \'%\'';
            if (idTypeAccessPortals)
                sql = sql + 'AND access_portals."idTypeAccessPortals" = $<idTypeAccessPortals>';
            if (status)
                sql = sql + 'AND access_portals."status" = $<status>';
            if (whatAccesses)
                sql = sql + 'AND type_access_portals."whatAccesses" = $<whatAccesses>';
            if (getPaswordIncorrect && getPaswordIncorrect === 'no') {
                sql = sql + 'AND ( access_portals."timestampPasswordIncorrect" IS NULL OR access_portals."timestampPasswordIncorrect" < access_portals."updatedAt" )';
            }
            const data = await this.connection.one(sql, { ...dto });
            return data;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.access_portals`, 'index', __filename, error);
        }
    }
    async show(idAccessPortals, tenant) {
        try {
            const sql = `
                SELECT access_portals.*
                FROM "${tenant}".access_portals AS access_portals
                WHERE "idAccessPortals" = $<idAccessPortals>
            `;
            const result = await this.connection.query(sql, { idAccessPortals });
            if (!result || result.length === 0)
                throw new common_1.NotFoundException(`AccessPortals with ID ${idAccessPortals} not found`);
            const client = result[0];
            return client;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.access_portals`, 'show', __filename, error);
        }
    }
    async store(accessPortals, tenant) {
        try {
            const sql = `
                INSERT INTO "${tenant}".access_portals("idAccessPortals", "idTypeAccessPortals", "createdAt", "updatedAt", "nameAccess", "login",  
                            "password", "status")
                VALUES ($<idAccessPortals>, $<idTypeAccessPortals>, $<createdAt>, $<updatedAt>, $<nameAccess>, $<login>, $<password>, $<status>)
                RETURNING "idAccessPortals"
            `;
            const result = await this.connection.one(sql, { ...accessPortals });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.access_portals`, 'store', __filename, error);
        }
    }
    async update(accessPortals, tenant) {
        try {
            const sql = `
                UPDATE "${tenant}".access_portals
                SET "idTypeAccessPortals" = $<idTypeAccessPortals>, "updatedAt" = $<updatedAt>, "nameAccess" = $<nameAccess>, 
                    "login" = $<login>, "password" = $<password>, "status" = $<status>
                WHERE "idAccessPortals" = $<idAccessPortals>
            `;
            await this.connection.result(sql, { ...accessPortals });
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.access_portals`, 'update', __filename, error);
        }
    }
    async updateDataAboutPasswordIncorrect(idAccessPortals, tenant, timestampPasswordIncorrect) {
        try {
            const sql = `
                UPDATE "${tenant}".access_portals
                SET "timestampPasswordIncorrect" = $<timestampPasswordIncorrect>
                WHERE "idAccessPortals" = $<idAccessPortals>
            `;
            await this.connection.result(sql, { idAccessPortals, timestampPasswordIncorrect });
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.access_portals`, 'updateDataAboutPasswordIncorrect', __filename, error);
        }
    }
    async destroy(idAccessPortals, tenant) {
        try {
            const sql = `
                DELETE
                FROM "${tenant}".access_portals AS access_portals
                WHERE access_portals."idAccessPortals" = $<idAccessPortals>
            `;
            const result = await this.connection.result(sql, { idAccessPortals });
            if (result.rowCount) {
                return (0, make_deleted_success_1.MakeDeleteResult)(`${tenant}.access_portals`, idAccessPortals);
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.access_portals`, 'destroy', __filename, error);
        }
    }
};
AccessPortalsRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection])
], AccessPortalsRepository);
exports.AccessPortalsRepository = AccessPortalsRepository;
//# sourceMappingURL=access_portals.repository.js.map