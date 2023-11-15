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
exports.ClientService = void 0;
const date_factory_1 = require("../../../common/adapters/date/date-factory");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const common_1 = require("@nestjs/common");
const city_repository_1 = require("../city/city.repository");
const user_repository_1 = require("../user_client/user.repository");
const client_entity_1 = require("./client.entity");
const client_repository_1 = require("./client.repository");
const e_client_status_1 = require("./enums/e-client-status");
let ClientService = class ClientService {
    constructor(repository, cityRepository, userRepository) {
        this.repository = repository;
        this.cityRepository = cityRepository;
        this.userRepository = userRepository;
        this.dateImplementation = (0, date_factory_1.makeDateImplementation)();
    }
    async getIdCity(idIbgeCity) {
        const cities = await this.cityRepository.index({ idIbge: idIbgeCity });
        if (cities instanceof make_error_request_response_1.ErrorRequestResponse || !cities.length) {
            throw new common_1.NotFoundException(`Dont find city with idIbge = ${idIbgeCity}`);
        }
        const city = cities[0];
        return city.id_city;
    }
    async index(getClientFilter) {
        try {
            return await this.repository.index(getClientFilter);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.client', 'index', __filename, error);
        }
    }
    async show(idClient) {
        return await this.repository.show(idClient);
    }
    async store(createOrUpdateClientDto) {
        try {
            let client = new client_entity_1.Client();
            client.createdAt = new Date();
            client.updatedAt = new Date();
            client = Object.assign(client, createOrUpdateClientDto);
            client.nickName = client.nickName || client.name.split(' ')[0];
            client.dateAsClient = this.dateImplementation.zonedTimeToUtc(client.dateAsClient, 'America/Sao_Paulo');
            client.idCity = await this.getIdCity(createOrUpdateClientDto.idIbgeCity);
            client.status = createOrUpdateClientDto.status || e_client_status_1.EClientStatus.ACTIVE;
            return await this.repository.store(client);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.client', 'store', __filename, error);
        }
    }
    async destroy(idClient) {
        try {
            const client = await this.show(idClient);
            if (client instanceof make_error_request_response_1.ErrorRequestResponse)
                throw client;
            return await this.repository.destroy(idClient);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.client', 'destroy', __filename, error);
        }
    }
    async update(idClient, createOrUpdateClientDto) {
        try {
            let client = await this.show(idClient);
            if (client instanceof make_error_request_response_1.ErrorRequestResponse)
                throw client;
            client = Object.assign(client, createOrUpdateClientDto);
            client.updatedAt = new Date();
            client.idCity = await this.getIdCity(createOrUpdateClientDto.idIbgeCity);
            await this.repository.update(client);
            return await this.show(idClient);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.client', 'update', __filename, error);
        }
    }
    async addUsers(idClient, addUsersDto) {
        try {
            const client = await this.show(idClient);
            if (client instanceof make_error_request_response_1.ErrorRequestResponse)
                throw client;
            await this.repository.addUsers(idClient, addUsersDto);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.client', 'addUsers', __filename, error);
        }
    }
};
ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_repository_1.ClientRepository,
        city_repository_1.CityRepository,
        user_repository_1.UserRepository])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map