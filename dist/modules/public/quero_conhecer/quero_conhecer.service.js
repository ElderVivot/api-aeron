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
exports.QueroConhecerService = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const common_1 = require("@nestjs/common");
const quero_conhecer_entity_1 = require("./quero_conhecer.entity");
const quero_conhecer_repository_1 = require("./quero_conhecer.repository");
let QueroConhecerService = class QueroConhecerService {
    constructor(repository) {
        this.repository = repository;
    }
    async index(filter) {
        try {
            return await this.repository.index(filter);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.quero_conhecer', 'index', __filename, error);
        }
    }
    async show(idQueroConhecer) {
        return await this.repository.show(idQueroConhecer);
    }
    async store(dto) {
        try {
            let data = new quero_conhecer_entity_1.QueroConhecer();
            data.createdAt = new Date();
            data = Object.assign(data, dto);
            data.alreadyContactedTheCustomer = '0';
            return await this.repository.store(data);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.quero_conhecer', 'store', __filename, error);
        }
    }
};
QueroConhecerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [quero_conhecer_repository_1.QueroConhecerRepository])
], QueroConhecerService);
exports.QueroConhecerService = QueroConhecerService;
//# sourceMappingURL=quero_conhecer.service.js.map