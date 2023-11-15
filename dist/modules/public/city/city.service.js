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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityService = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const common_1 = require("@nestjs/common");
const state_repository_1 = require("../state/state.repository");
const city_repository_1 = require("./city.repository");
let CityService = class CityService {
    constructor(repository, stateRepository) {
        this.repository = repository;
        this.stateRepository = stateRepository;
    }
    async index(getFilter) {
        return await this.repository.index({ ...getFilter });
    }
    async show(id) {
        return await this.repository.show(id);
    }
    async store(createOrUpdateDto) {
        const { acronymState } = createOrUpdateDto;
        try {
            const states = await this.stateRepository.index({ acronym: acronymState });
            if (states instanceof make_error_request_response_1.ErrorRequestResponse)
                throw states;
            const state = states[0];
            return await this.repository.store(createOrUpdateDto, state);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.city', 'store', __filename, error);
        }
    }
    async update(id, createOrUpdateDto) {
        const { acronymState } = createOrUpdateDto;
        try {
            const states = await this.stateRepository.index({ acronym: acronymState });
            if (states instanceof make_error_request_response_1.ErrorRequestResponse)
                throw states;
            const state = states[0];
            const show = await this.show(id);
            if (show instanceof make_error_request_response_1.ErrorRequestResponse)
                throw show;
            const city = await this.repository.update(id, createOrUpdateDto, state);
            return city;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.city', 'update', __filename, error);
        }
    }
    async upsert(createOrUpdateDto) {
        const { name, idIbge, acronymState } = createOrUpdateDto;
        try {
            const cityExist = await this.index({ idIbge });
            if (!(cityExist instanceof make_error_request_response_1.ErrorRequestResponse) && cityExist.length > 0) {
                return await this.update(cityExist[0].id_city, { name, idIbge, acronymState });
            }
            else {
                const store = await this.store({ name, idIbge, acronymState });
                if (!(store instanceof make_error_request_response_1.ErrorRequestResponse))
                    return await this.show(store.id_city);
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.city', 'upsert', __filename, error);
        }
    }
    async destroy(id) {
        try {
            const show = await this.show(id);
            if (show instanceof make_error_request_response_1.ErrorRequestResponse)
                throw show;
            const result = await this.repository.destroy(id);
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.city', 'destroy', __filename, error);
        }
    }
};
CityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [city_repository_1.CityRepository,
        state_repository_1.StateRepository])
], CityService);
exports.CityService = CityService;
//# sourceMappingURL=city.service.js.map