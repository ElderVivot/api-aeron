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
exports.ClientsResumeController = void 0;
const common_1 = require("@nestjs/common");
const validation_custom_pipe_1 = require("../../../common/pipes/validation-custom.pipe");
const clients_resume_service_1 = require("./clients_resume.service");
const filter_dto_1 = require("./dto/filter.dto");
let ClientsResumeController = class ClientsResumeController {
    constructor(service) {
        this.service = service;
    }
    async index(filterDto) {
        return this.service.index(filterDto);
    }
    async indexQtdRecordsInAnyTable(tableName) {
        return this.service.indexQtdRecordsInAnyTable(tableName);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], ClientsResumeController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('show_qtd_records_in_any_table/:table_name'),
    __param(0, (0, common_1.Param)('table_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientsResumeController.prototype, "indexQtdRecordsInAnyTable", null);
ClientsResumeController = __decorate([
    (0, common_1.Controller)('clients_resume'),
    __metadata("design:paramtypes", [clients_resume_service_1.ClientsResumeService])
], ClientsResumeController);
exports.ClientsResumeController = ClientsResumeController;
//# sourceMappingURL=clients_resume.controller.js.map