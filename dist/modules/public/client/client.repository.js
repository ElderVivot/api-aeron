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
exports.ClientRepository = void 0;
const make_deleted_success_1 = require("../../../common/factories/make-deleted-success");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
let ClientRepository = class ClientRepository {
    constructor(connection) {
        this.connection = connection;
    }
    async index(getClientFilter) {
        const { name, status, federalRegistration } = getClientFilter;
        try {
            let sql = `
                SELECT client.*
                FROM public.client AS client                     
                WHERE "idClient" IS NOT NULL
            `;
            if (name)
                sql = sql + 'AND "name" LIKE \'%\' || $<name> || \'%\'';
            if (status)
                sql = sql + 'AND "status" = $<status>';
            if (federalRegistration)
                sql = sql + 'AND "federalRegistration" = $<federalRegistration>';
            const result = await this.connection.query(sql, { name, status, federalRegistration });
            const clients = result;
            return clients;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.client', 'show', __filename, error);
        }
    }
    async show(idClient) {
        try {
            const sql = `
                SELECT client.*
                FROM public.client AS client                     
                WHERE "idClient" = $<idClient>
            `;
            const result = await this.connection.query(sql, { idClient });
            if (!result || result.length === 0)
                throw new common_1.NotFoundException(`Client with ID ${idClient} not found`);
            const client = result[0];
            return client;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.client', 'show', __filename, error);
        }
    }
    async store(client) {
        try {
            const sql = `
                INSERT INTO public.client("idClient", "createdAt", "updatedAt", "name", "nickName", "typeFederalRegistration",
                                          "federalRegistration", "status", "dddPhone", "phone", "email", "neighborhood", "street",
                                          "zipCode", "complement", "referency", "dateAsClient", "idCity")
                VALUES ($<idClient>, $<createdAt>, $<updatedAt>, $<name>, $<nickName>, $<typeFederalRegistration>,  
                        $<federalRegistration>, $<status>, $<dddPhone>, $<phone>, $<email>, $<neighborhood>, $<street>,
                        $<zipCode>, $<complement>, $<referency>, $<dateAsClient>, $<idCity>)
                RETURNING "idClient"
            `;
            const result = await this.connection.one(sql, { ...client });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.client', 'store', __filename, error);
        }
    }
    async update(client) {
        try {
            const sql = `
                UPDATE public.client
                SET "updatedAt" = $<updatedAt>, "name" = $<name>, "nickName" = $<nickName>, "typeFederalRegistration" = $<typeFederalRegistration>,  
                    "federalRegistration" = $<federalRegistration>, "status" = $<status>, "dddPhone" = $<dddPhone>, 
                    "phone" = $<phone>, "email" = $<email>, "neighborhood" = $<neighborhood>, "street" = $<street>,
                    "zipCode" = $<zipCode>, "complement" = $<complement>, "referency" = $<referency>, "dateAsClient" = $<dateAsClient>, 
                    "idCity" = $<idCity>
                WHERE "idClient" = $<idClient>
            `;
            await this.connection.result(sql, { ...client });
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.client', 'update', __filename, error);
        }
    }
    async destroy(idClient) {
        try {
            const sql = `
                DELETE
                FROM public.client AS client                     
                WHERE client."idClient" = $<idClient>
            `;
            const result = await this.connection.result(sql, { idClient });
            if (result.rowCount) {
                return (0, make_deleted_success_1.MakeDeleteResult)('public.client', idClient);
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.client', 'destroy', __filename, error);
        }
    }
    async addUsers(idClient, addUsersDto) {
        const listIdUserDontPossibleAdd = [];
        try {
            const { usersId } = addUsersDto;
            for (const idUser of usersId) {
                try {
                    const sql = `
                        INSERT INTO public.client_x_user_client("idClient", "idUser", "createdAt", "updatedAt" )
                        VALUES ($<idClient>, $<idUser>, $<createdAt>, $<updatedAt>)
                        RETURNING "idClient"
                    `;
                    const createdAt = new Date();
                    const updatedAt = createdAt;
                    await this.connection.one(sql, { idClient, idUser, createdAt, updatedAt });
                }
                catch (error) {
                    let errorMessage = error;
                    if (error.code === '23503') {
                        errorMessage = 'Its dont find user with this id';
                    }
                    listIdUserDontPossibleAdd.push({
                        idUser,
                        error: errorMessage
                    });
                }
            }
            if (listIdUserDontPossibleAdd.length > 0) {
                throw new Error('Error add any user');
            }
        }
        catch (error) {
            if (error === 'Error add any user') {
                return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.client', 'addUsers', __filename, listIdUserDontPossibleAdd);
            }
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.client', 'addUsers', __filename, error);
        }
    }
};
ClientRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection])
], ClientRepository);
exports.ClientRepository = ClientRepository;
//# sourceMappingURL=client.repository.js.map