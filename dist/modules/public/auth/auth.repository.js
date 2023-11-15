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
exports.AuthRepository = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
let AuthRepository = class AuthRepository {
    constructor(connection) {
        this.connection = connection;
    }
    async showClientsUserHaveAccess(username) {
        try {
            const sql = `
                SELECT user_client."idUser", user_client."username", client."idClient", client."name", client."federalRegistration", client.status, client.modules
                  FROM user_client
                       INNER JOIN client_x_user_client AS client_x_user
                            ON    client_x_user."idUser" = user_client."idUser"
                       INNER JOIN client
                            ON    client."idClient" = client_x_user."idClient"
                 WHERE user_client."username" = $<username>
                 ORDER BY client.status, client."createdAt"
            `;
            const result = await this.connection.query(sql, { username });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'showClientsUserHaveAccess', __filename, error);
        }
    }
};
AuthRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection])
], AuthRepository);
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map