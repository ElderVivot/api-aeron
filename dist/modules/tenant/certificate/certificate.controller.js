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
exports.CertificateController = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const validation_custom_pipe_1 = require("../../../common/pipes/validation-custom.pipe");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const certificate_service_1 = require("./certificate.service");
const filter_dto_1 = require("./dto/filter.dto");
let CertificateController = class CertificateController {
    constructor(service) {
        this.service = service;
    }
    async index(tenant, dto) {
        return this.service.index(dto, tenant);
    }
    async getListCertificateNotOverdue(tenant, dto) {
        return this.service.getListCertificateNotOverdue(dto, tenant);
    }
    async indexToFront(tenant, dto, res) {
        const dataService = await this.service.indexToFront(dto, tenant);
        if (!(dataService instanceof make_error_request_response_1.ErrorRequestResponse)) {
            res.setHeader('x-total-count', dataService.count);
            res.send(dataService.data);
        }
    }
    async show(tenant, id) {
        return await this.service.show(id, tenant);
    }
    async showWithDecryptPassword(tenant, id) {
        return await this.service.showWithDecryptPassword(id, tenant);
    }
    async store(tenant, password, file) {
        return await this.service.store({ file, password }, tenant);
    }
    async destroy(tenant, id) {
        return await this.service.destroy(id, tenant);
    }
    async update(tenant, id, password, file) {
        return await this.service.update(id, { file, password }, tenant);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Query)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/list_certificate_not_overdue'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Query)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "getListCertificateNotOverdue", null);
__decorate([
    (0, common_1.Get)('/frontend'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Query)(validation_custom_pipe_1.ValidationPipeCustom)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_dto_1.FilterDto, Object]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "indexToFront", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "show", null);
__decorate([
    (0, common_1.Get)('/:id/show_with_decrypt_password'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "showWithDecryptPassword", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "store", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "destroy", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)('password')),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "update", null);
CertificateController = __decorate([
    (0, common_1.Controller)('certificate'),
    __metadata("design:paramtypes", [certificate_service_1.CertificateService])
], CertificateController);
exports.CertificateController = CertificateController;
//# sourceMappingURL=certificate.controller.js.map