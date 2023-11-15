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
exports.StateService = void 0;
const common_1 = require("@nestjs/common");
const state_repository_1 = require("./state.repository");
let StateService = class StateService {
    constructor(repository) {
        this.repository = repository;
    }
    async index(getStateFilter) {
        return await this.repository.index(getStateFilter);
    }
    async show(id) {
        return await this.repository.show(id);
    }
    async store(createOrUpdateDto) {
        return await this.repository.store(createOrUpdateDto);
    }
    async destroy(id) {
        return await this.repository.destroy(id);
    }
    async update(id, createOrUpdateDto) {
        return await this.repository.update(id, createOrUpdateDto);
    }
};
StateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [state_repository_1.StateRepository])
], StateService);
exports.StateService = StateService;
//# sourceMappingURL=state.service.js.map