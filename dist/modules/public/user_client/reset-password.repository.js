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
exports.ResetPasswordRepository = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const make_result_generic_response_1 = require("../../../common/factories/make-result-generic-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
let ResetPasswordRepository = class ResetPasswordRepository {
    constructor(connection) {
        this.connection = connection;
    }
    async showResetPasswordNotUsed(idResetPassword) {
        try {
            const sql = `
                SELECT user_client_reset_password.*
                FROM public.user_client_reset_password AS user_client_reset_password                     
                WHERE "idResetPassword" = $<idResetPassword>
                  AND "used" = false
                ORDER BY "createdAt" DESC
            `;
            const result = await this.connection.query(sql, { idResetPassword });
            if (!result || result.length === 0) {
                throw new common_1.NotFoundException(`UserClientResetPassword with ID ${idResetPassword} not found`);
            }
            const resetPassword = result[0];
            return resetPassword;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'show', __filename, error);
        }
    }
    async sendInformationToResetPassword(userResetPassword) {
        try {
            const sql = `
                INSERT INTO public.user_client_reset_password("idResetPassword", "used", "idUser")
                VALUES ($<idResetPassword>, $<used>, $<idUser>)
                RETURNING "idResetPassword"
            `;
            const result = await this.connection.one(sql, { ...userResetPassword });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client_reset_password', 'sendInformationToResetPassword', __filename, error);
        }
    }
    async resetPassword(idResetPassword) {
        try {
            const sql = `
                UPDATE public.user_client_reset_password 
                SET "used" = true
                WHERE "idResetPassword" = $<idResetPassword>
            `;
            const result = await this.connection.result(sql, { idResetPassword });
            if (result.rowCount) {
                return (0, make_result_generic_response_1.MakeResultGenericResponse)('Password update with success', 201);
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'resetPassword', __filename, error);
        }
    }
};
ResetPasswordRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection])
], ResetPasswordRepository);
exports.ResetPasswordRepository = ResetPasswordRepository;
//# sourceMappingURL=reset-password.repository.js.map