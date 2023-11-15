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
exports.CityController = void 0;
const validation_custom_pipe_1 = require("../../../common/pipes/validation-custom.pipe");
const common_1 = require("@nestjs/common");
const city_service_1 = require("./city.service");
const create_or_update_dto_1 = require("./dto/create-or-update.dto");
const get_filter_dto_1 = require("./dto/get-filter.dto");
let CityController = class CityController {
    constructor(service) {
        this.service = service;
    }
    async index(filterDto) {
        return this.service.index(filterDto);
    }
    async show(id) {
        return await this.service.show(id);
    }
    async upsert(createOrUpdateDto) {
        return await this.service.upsert(createOrUpdateDto);
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
    __metadata("design:paramtypes", [get_filter_dto_1.GetFilterDto]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(validation_custom_pipe_1.ValidationPipeCustom),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_or_update_dto_1.CreateOrUpdateDto]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "upsert", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "destroy", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UsePipes)(validation_custom_pipe_1.ValidationPipeCustom),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_or_update_dto_1.CreateOrUpdateDto]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "update", null);
CityController = __decorate([
    (0, common_1.Controller)('city'),
    __metadata("design:paramtypes", [city_service_1.CityService])
], CityController);
exports.CityController = CityController;
//# sourceMappingURL=city.controller.js.map