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
exports.QueroConhecerRepository = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
let QueroConhecerRepository = class QueroConhecerRepository {
    constructor(connection) {
        this.connection = connection;
    }
    async index(filterDto) {
        const { name, email, companie, occupation, phone, alreadyContactedTheCustomer } = filterDto;
        try {
            let sql = `
                SELECT quero_conhecer.*
                FROM public.quero_conhecer AS quero_conhecer
                WHERE "idQueroConhecer" IS NOT NULL
            `;
            if (name)
                sql = sql + 'AND "name" LIKE \'%\' || $<name> || \'%\'';
            if (email)
                sql = sql + 'AND "email" = $<email>';
            if (phone)
                sql = sql + 'AND "phone" = $<phone>';
            if (occupation)
                sql = sql + 'AND "occupation" = $<occupation>';
            if (companie)
                sql = sql + 'AND "companie" LIKE \'%\' || $<companie> || \'%\'';
            if (alreadyContactedTheCustomer && alreadyContactedTheCustomer === '1') {
                sql = sql + 'AND "alreadyContactedTheCustomer" = \'1\'';
            }
            const result = await this.connection.query(sql, { ...filterDto });
            const data = result;
            return data;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.quero_conhecer', 'show', __filename, error);
        }
    }
    async show(idQueroConhecer) {
        try {
            const sql = `
                SELECT quero_conhecer.*
                FROM public.quero_conhecer AS quero_conhecer
                WHERE "idQueroConhecer" = $<idQueroConhecer>
            `;
            const result = await this.connection.query(sql, { idQueroConhecer });
            if (!result || result.length === 0)
                throw new common_1.NotFoundException(`QueroConhecer with ID ${idQueroConhecer} not found`);
            const data = result[0];
            return data;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.quero_conhecer', 'show', __filename, error);
        }
    }
    async store(dto) {
        try {
            const sql = `
                INSERT INTO public.quero_conhecer("idQueroConhecer", "createdAt", "name", "email", "phone",
                            "companie", "occupation", "alreadyContactedTheCustomer")
                VALUES ($<idQueroConhecer>, $<createdAt>, $<name>, $<email>, $<phone>,  
                        $<companie>, $<occupation>, $<alreadyContactedTheCustomer>)
                RETURNING *
            `;
            const result = await this.connection.one(sql, { ...dto });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.quero_conhecer', 'store', __filename, error);
        }
    }
};
QueroConhecerRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection])
], QueroConhecerRepository);
exports.QueroConhecerRepository = QueroConhecerRepository;
//# sourceMappingURL=quero_conhecer.repository.js.map