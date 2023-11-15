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
exports.QueroConhecerController = void 0;
const common_1 = require("@nestjs/common");
const validation_custom_pipe_1 = require("../../../common/pipes/validation-custom.pipe");
const create_or_update_dto_1 = require("./dto/create-or-update.dto");
const filter_dto_1 = require("./dto/filter.dto");
const quero_conhecer_service_1 = require("./quero_conhecer.service");
let QueroConhecerController = class QueroConhecerController {
    constructor(service) {
        this.service = service;
    }
    async index(filterDto) {
        return this.service.index(filterDto);
    }
    async show(id) {
        return await this.service.show(id);
    }
    async store(dto) {
        return await this.service.store(dto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], QueroConhecerController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QueroConhecerController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_or_update_dto_1.CreateOrUpdateDto]),
    __metadata("design:returntype", Promise)
], QueroConhecerController.prototype, "store", null);
QueroConhecerController = __decorate([
    (0, common_1.Controller)('quero_conhecer'),
    __metadata("design:paramtypes", [quero_conhecer_service_1.QueroConhecerService])
], QueroConhecerController);
exports.QueroConhecerController = QueroConhecerController;
//# sourceMappingURL=quero_conhecer.controller.js.map