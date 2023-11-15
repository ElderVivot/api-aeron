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
exports.StateRepository = void 0;
const make_deleted_success_1 = require("../../../common/factories/make-deleted-success");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
let StateRepository = class StateRepository {
    constructor(connection) {
        this.connection = connection;
    }
    async index(getStateFilter, errorIfDontFindAnything = false) {
        const { name, acronym } = getStateFilter;
        try {
            let sql = `
                SELECT *
                FROM public.state
                WHERE "id_state" IS NOT NULL
            `;
            if (name)
                sql = sql + 'AND "name" LIKE \'%\' || $<name> || \'%\'';
            if (acronym)
                sql = sql + '\nAND "acronym" = $<acronym>';
            const result = await this.connection.query(sql, { name, acronym });
            if (errorIfDontFindAnything && (!result || result.length === 0)) {
                throw new common_1.NotFoundException(`State with filter ${getStateFilter} not found`);
            }
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.state', 'index', __filename, error);
        }
    }
    async show(idState) {
        try {
            const sql = `
                SELECT *
                FROM public.state
                WHERE "id_state" = $<idState>
            `;
            const result = await this.connection.query(sql, { idState });
            if (!result || result.length === 0) {
                throw new common_1.NotFoundException(`State with ID ${idState} not found`);
            }
            return result[0];
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.state', 'show', __filename, error);
        }
    }
    async store(createOrUpdateDto) {
        const { name, acronym } = createOrUpdateDto;
        try {
            const sql = `
                INSERT INTO public.state(name, acronym)
                VALUES ($<name>, $<acronym>)
                RETURNING id_state
            `;
            const result = await this.connection.one(sql, { name, acronym });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.state', 'store', __filename, error);
        }
    }
    async destroy(idState) {
        try {
            const show = await this.show(idState);
            if (show instanceof make_error_request_response_1.ErrorRequestResponse)
                throw show;
            const sql = `
                DELETE
                FROM public.state
                WHERE "id_state" = $<idState>
            `;
            const result = await this.connection.result(sql, { idState });
            if (result.rowCount) {
                return (0, make_deleted_success_1.MakeDeleteResult)('public.state', idState);
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.state', 'destroy', __filename, error);
        }
    }
    async update(idState, createOrUpdateDto) {
        try {
            const show = await this.show(idState);
            if (show instanceof make_error_request_response_1.ErrorRequestResponse)
                throw show;
            const { name, acronym } = createOrUpdateDto;
            const sql = `
                UPDATE public.state
                SET name = $<name>, acronym = $<acronym>
                WHERE id_state = $<idState>
            `;
            const result = await this.connection.result(sql, { idState, name, acronym });
            if (result.rowCount) {
                return this.show(idState);
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.state', 'update', __filename, error);
        }
    }
};
StateRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection])
], StateRepository);
exports.StateRepository = StateRepository;
//# sourceMappingURL=state.repository.js.map