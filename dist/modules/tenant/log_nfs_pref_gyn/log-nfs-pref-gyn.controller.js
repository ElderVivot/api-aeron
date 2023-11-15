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
exports.LogNfsPrefGynController = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const validation_custom_pipe_1 = require("../../../common/pipes/validation-custom.pipe");
const common_1 = require("@nestjs/common");
const create_or_update_dto_1 = require("./dto/create-or-update.dto");
const filter_dto_1 = require("./dto/filter.dto");
const log_nfs_pref_gyn_service_1 = require("./log-nfs-pref-gyn.service");
let LogNfsPrefGynController = class LogNfsPrefGynController {
    constructor(service) {
        this.service = service;
    }
    async index(tenant, dto, res) {
        const dataService = await this.service.index(dto, tenant);
        if (!(dataService instanceof make_error_request_response_1.ErrorRequestResponse)) {
            res.setHeader('x-total-count', dataService.count);
            res.send(dataService.data);
        }
    }
    async show(tenant, id) {
        return await this.service.show(id, tenant);
    }
    async store(tenant, dto) {
        return await this.service.store(dto, tenant);
    }
    async update(tenant, id, dto) {
        return await this.service.update(id, dto, tenant);
    }
    async uploadPrintLog(tenant, id, body) {
        return await this.service.uploadPrintLog(id, body.bufferImage, tenant);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Query)(validation_custom_pipe_1.ValidationPipeCustom)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_dto_1.FilterDto, Object]),
    __metadata("design:returntype", Promise)
], LogNfsPrefGynController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LogNfsPrefGynController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_or_update_dto_1.CreateOrUpdateDto]),
    __metadata("design:returntype", Promise)
], LogNfsPrefGynController.prototype, "store", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_or_update_dto_1.CreateOrUpdateDto]),
    __metadata("design:returntype", Promise)
], LogNfsPrefGynController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('/:id/upload_print_log'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LogNfsPrefGynController.prototype, "uploadPrintLog", null);
LogNfsPrefGynController = __decorate([
    (0, common_1.Controller)('log_nfs_pref_gyn'),
    __metadata("design:paramtypes", [log_nfs_pref_gyn_service_1.LogNfsPrefGynService])
], LogNfsPrefGynController);
exports.LogNfsPrefGynController = LogNfsPrefGynController;
//# sourceMappingURL=log-nfs-pref-gyn.controller.js.map