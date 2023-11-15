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
exports.MigrationController = void 0;
const validation_custom_pipe_1 = require("../../../common/pipes/validation-custom.pipe");
const common_1 = require("@nestjs/common");
const get_filter_dto_1 = require("./dto/get-filter.dto");
const migration_service_1 = require("./migration.service");
let MigrationController = class MigrationController {
    constructor(service) {
        this.service = service;
    }
    async index(filterDto) {
        return this.service.index(filterDto);
    }
    async show(id) {
        return await this.service.show(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(validation_custom_pipe_1.ValidationPipeCustom),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_filter_dto_1.GetFilterDto]),
    __metadata("design:returntype", Promise)
], MigrationController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MigrationController.prototype, "show", null);
MigrationController = __decorate([
    (0, common_1.Controller)('migrations_executed'),
    __metadata("design:paramtypes", [migration_service_1.MigrationService])
], MigrationController);
exports.MigrationController = MigrationController;
//# sourceMappingURL=migration.controller.js.map