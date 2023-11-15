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
exports.MigrationRepository = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
let MigrationRepository = class MigrationRepository {
    constructor(connection) {
        this.connection = connection;
    }
    async index(getFilter, errorIfDontFindAnything = false) {
        const { schema, name, typeResult, createdAt } = getFilter;
        try {
            let sql = `
                SELECT *
                FROM public.migrations_executed
                WHERE "idMigrationExecuted" IS NOT NULL
            `;
            if (schema)
                sql = sql + '\nAND "schema" = $<schema>';
            if (name)
                sql = sql + 'AND "name" LIKE \'%\' || $<name> || \'%\'';
            if (typeResult)
                sql = sql + 'AND "typeResult" = $<typeResult>';
            if (createdAt)
                sql = sql + 'AND DATE("createdAt") = DATE($<createdAt>)';
            const result = await this.connection.query(sql, { schema, name, typeResult, createdAt });
            if (errorIfDontFindAnything && (!result || result.length === 0)) {
                throw new common_1.NotFoundException(`Migration with filter ${getFilter} not found`);
            }
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.migration', 'index', __filename, error);
        }
    }
    async show(idMigrationExecuted) {
        try {
            const sql = `
                SELECT *
                FROM public.migrations_executed
                WHERE "idMigrationExecuted" = $<idMigrationExecuted>
            `;
            const result = await this.connection.query(sql, { idMigrationExecuted });
            if (!result || result.length === 0) {
                throw new common_1.NotFoundException(`Migration with ID ${idMigrationExecuted} not found`);
            }
            return result[0];
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.migration', 'show', __filename, error);
        }
    }
};
MigrationRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection])
], MigrationRepository);
exports.MigrationRepository = MigrationRepository;
//# sourceMappingURL=migration.repository.js.map