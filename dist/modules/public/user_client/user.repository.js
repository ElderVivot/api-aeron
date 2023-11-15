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
exports.UserRepository = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
let UserRepository = class UserRepository {
    constructor(connection) {
        this.connection = connection;
    }
    async index(idClient, getUserDto) {
        try {
            const { name, email, username, phone, active } = getUserDto;
            let sql = `
                SELECT "user".*, '' AS password
                  FROM "user_client" AS "user"
                       INNER JOIN "client_x_user_client" AS "client_x_user"
                            ON    "client_x_user"."idUser" = "user"."idUser"
                 WHERE "client_x_user"."idClient" = $<idClient>
            `;
            if (name)
                sql = sql + 'AND "user"."name" LIKE \'%\' || $<name> || \'%\'';
            if (username)
                sql = sql + 'AND "user"."username" LIKE \'%\' || $<username> || \'%\'';
            if (email)
                sql = sql + 'AND "user"."email" LIKE \'%\' || $<email> || \'%\'';
            if (phone)
                sql = sql + 'AND "user"."phone" LIKE \'%\' || $<phone> || \'%\'';
            if (active && active === 'true')
                sql = sql + 'AND "user"."active" IS TRUE';
            if (active && active === 'false')
                sql = sql + 'AND "user"."active" IS FALSE';
            const result = await this.connection.query(sql, { idClient, ...getUserDto });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'index', __filename, error);
        }
    }
    async getUserPermissions(idUser) {
        try {
            const sql = `
                SELECT *
                  FROM "user_client_permissions" AS "user"
                 WHERE "user"."idUser" = $<idUser>
            `;
            const result = await this.connection.query(sql, { idUser });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'getUserPermissions', __filename, error);
        }
    }
    async getListUsername(username) {
        try {
            const sql = `
                SELECT "user"."username"
                  FROM "user_client" AS "user"
                 WHERE "user"."username" LIKE $<username> || '%'
            `;
            const result = await this.connection.query(sql, { username });
            const listUsers = [];
            for (const user of result) {
                listUsers.push(user.username);
            }
            return listUsers;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'getListUsername', __filename, error);
        }
    }
    async show(dto) {
        const { idUser, username } = dto;
        try {
            let sql = `
                SELECT user_client.*
                FROM public.user_client AS user_client                     
                WHERE "idUser" IS NOT NULL
            `;
            if (!idUser && !username)
                throw new Error('Its necessary to inform idUser or username');
            if (idUser)
                sql = sql + 'AND "idUser" = $<idUser>';
            if (username)
                sql = sql + '\n AND "username" = $<username>';
            const result = await this.connection.query(sql, { idUser, username });
            if (!result || result.length === 0) {
                if (idUser)
                    throw new common_1.NotFoundException(`UserClient with ID ${idUser} not found`);
                if (username)
                    throw new common_1.NotFoundException(`UserClient with username ${username} not found`);
            }
            const user = result[0];
            return user;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'show', __filename, error);
        }
    }
    async store(user) {
        try {
            const sql = `
                INSERT INTO public.user_client("idUser", "username", "active", "password", "email", "name", "nickName", "dddPhone", "phone",
                            "departaments", "isUserMain", "tenantQueroConhecer" )
                VALUES ($<idUser>, $<username>, $<active>, $<password>, $<email>, $<name>, $<nickName>, $<dddPhone>, $<phone>,
                        $<departaments>, $<isUserMain>, $<tenantQueroConhecer> )
                RETURNING *
            `;
            const result = await this.connection.one(sql, { ...user });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'store', __filename, error);
        }
    }
    async addPermissions(user) {
        try {
            const sql = `
                INSERT INTO public.user_client_permissions("idUserPermissions", "idUser", "createdAt", "updatedAt", "functionality", "permissions")
                VALUES ($<idUserPermissions>, $<idUser>, $<createdAt>, $<updatedAt>, $<functionality>, $<permissions>)
                RETURNING *
            `;
            const result = await this.connection.one(sql, { ...user });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'addPermissions', __filename, error);
        }
    }
    async updatePermissions(user) {
        try {
            const sql = `
                UPDATE public.user_client_permissions 
                SET "updatedAt" = $<updatedAt>, "functionality" = $<functionality>, "permissions" = $<permissions>
                WHERE "idUser" = $<idUser>
                  AND "idUserPermissions" = $<idUserPermissions>
            `;
            await this.connection.result(sql, { ...user });
            return null;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'addPermissions', __filename, error);
        }
    }
    async confirmRegistration(idUser, user) {
        try {
            const sql = `
                UPDATE public.user_client 
                SET "name" = $<name>, "password" = $<password>, "nickName" = $<nickName>, "dddPhone" = $<dddPhone>,
                    "phone" = $<phone>, "active" = $<active>, "confirmedRegistration" = $<confirmedRegistration>
                WHERE "idUser" = $<idUser>
            `;
            const result = await this.connection.result(sql, { ...user });
            if (result.rowCount) {
                return this.show({ idUser });
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'confirmRegistration', __filename, error);
        }
    }
    async update(idUser, user) {
        try {
            const sql = `
                UPDATE public.user_client 
                SET "updatedAt" = $<updatedAt>, "name" = $<name>, "nickName" = $<nickName>, "dddPhone" = $<dddPhone>, "email" = $<email>,
                    "phone" = $<phone>, "active" = $<active>, "isUserMain" = $<isUserMain>, "departaments" = $<departaments>
                WHERE "idUser" = $<idUser>
            `;
            const result = await this.connection.result(sql, { ...user });
            if (result.rowCount) {
                return this.show({ idUser });
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'update', __filename, error);
        }
    }
    async delete(idUser) {
        try {
            const sql = `
                DELETE FROM public.user_client 
                WHERE "idUser" = $<idUser>
            `;
            const result = await this.connection.result(sql, { idUser });
            if (result.rowCount) {
                return 'deleted success';
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'delete', __filename, error);
        }
    }
    async updatePassword(idUser, password) {
        try {
            const sql = `
                UPDATE public.user_client 
                SET "password" = $<password>
                WHERE "idUser" = $<idUser>
            `;
            const result = await this.connection.result(sql, { idUser, password });
            if (result.rowCount) {
                return this.show({ idUser });
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'updatePassword', __filename, error);
        }
    }
};
UserRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map