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
exports.StateController = void 0;
const validation_custom_pipe_1 = require("../../../common/pipes/validation-custom.pipe");
const common_1 = require("@nestjs/common");
const create_or_update_state_dto_1 = require("./dto/create-or-update-state.dto");
const get_state_filter_dto_1 = require("./dto/get-state-filter.dto");
const state_service_1 = require("./state.service");
let StateController = class StateController {
    constructor(service) {
        this.service = service;
    }
    async index(filterDto) {
        return this.service.index(filterDto);
    }
    async show(id) {
        return await this.service.show(id);
    }
    async store(createOrUpdateDto) {
        return await this.service.store(createOrUpdateDto);
    }
    async destroy(id) {
        return await this.service.destroy(id);
    }
    async update(id, createOrUpdateDto) {
        return await this.service.update(id, createOrUpdateDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(validation_custom_pipe_1.ValidationPipeCustom),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_state_filter_dto_1.GetStateFilterDto]),
    __metadata("design:returntype", Promise)
], StateController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StateController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(validation_custom_pipe_1.ValidationPipeCustom),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_or_update_state_dto_1.CreateOrUpdateStateDto]),
    __metadata("design:returntype", Promise)
], StateController.prototype, "store", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StateController.prototype, "destroy", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UsePipes)(validation_custom_pipe_1.ValidationPipeCustom),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_or_update_state_dto_1.CreateOrUpdateStateDto]),
    __metadata("design:returntype", Promise)
], StateController.prototype, "update", null);
StateController = __decorate([
    (0, common_1.Controller)('state'),
    __metadata("design:paramtypes", [state_service_1.StateService])
], StateController);
exports.StateController = StateController;
//# sourceMappingURL=state.controller.js.map