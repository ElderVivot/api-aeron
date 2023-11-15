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
exports.CityRepository = void 0;
const make_deleted_success_1 = require("../../../common/factories/make-deleted-success");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
const state_repository_1 = require("../state/state.repository");
let CityRepository = class CityRepository {
    constructor(connection, stateRepository) {
        this.connection = connection;
        this.stateRepository = stateRepository;
    }
    async index(getFilter) {
        const { name, acronymState, idIbge } = getFilter;
        try {
            let sql = `
                SELECT city.*
                FROM public.city AS city
                     INNER JOIN public.state AS state
                          ON    state.id_state = city.id_state
                WHERE "id_city" IS NOT NULL
            `;
            if (name)
                sql = sql + 'AND city.name LIKE \'%\' || $<name> || \'%\'';
            if (acronymState)
                sql = sql + '\nAND state.acronym = $<acronymState>';
            if (idIbge)
                sql = sql + '\nAND city.id_ibge = $<idIbge>';
            const result = await this.connection.query(sql, { name, acronymState, idIbge });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.city', 'index', __filename, error);
        }
    }
    async show(idCity) {
        try {
            const sql = `
                SELECT city.*
                FROM public.city AS city                     
                WHERE "id_city" = $<idCity>
            `;
            const result = await this.connection.query(sql, { idCity });
            if (!result || result.length === 0) {
                throw new common_1.NotFoundException(`City with ID ${idCity} not found`);
            }
            return result[0];
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.city', 'show', __filename, error);
        }
    }
    async store(createOrUpdateDto, state) {
        const { name, idIbge } = createOrUpdateDto;
        try {
            const sql = `
                INSERT INTO public.city(name, id_ibge, id_state)
                VALUES ($<name>, $<idIbge>, $<idState>)
                RETURNING id_city
            `;
            const result = await this.connection.one(sql, { name, idIbge, idState: state.id_state });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.city', 'store', __filename, error);
        }
    }
    async update(idCity, createOrUpdateDto, state) {
        const { name, idIbge } = createOrUpdateDto;
        try {
            const sql = `
                UPDATE public.city 
                SET name = $<name>, id_ibge = $<idIbge>, id_state = $<idState>
                WHERE id_city = $<idCity>
            `;
            const result = await this.connection.result(sql, { idCity, name, idIbge, idState: state.id_state });
            if (result.rowCount) {
                return this.show(idCity);
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.city', 'store', __filename, error);
        }
    }
    async destroy(idCity) {
        try {
            const sql = `
                DELETE
                FROM public.city AS city                     
                WHERE city."id_city" = $<idCity>
            `;
            const result = await this.connection.result(sql, { idCity });
            if (result.rowCount) {
                return (0, make_deleted_success_1.MakeDeleteResult)('public.city', idCity);
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.city', 'destroy', __filename, error);
        }
    }
};
CityRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection,
        state_repository_1.StateRepository])
], CityRepository);
exports.CityRepository = CityRepository;
//# sourceMappingURL=city.repository.js.map