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
exports.AccessPortalsController = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const validation_custom_pipe_1 = require("../../../common/pipes/validation-custom.pipe");
const common_1 = require("@nestjs/common");
const access_portals_service_1 = require("./access_portals.service");
const create_or_update_dto_1 = require("./dto/create-or-update.dto");
const filter_dto_1 = require("./dto/filter.dto");
let AccessPortalsController = class AccessPortalsController {
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
    async showWithDecryptPassword(tenant, id) {
        return await this.service.showWithDecryptPassword(id, tenant);
    }
    async store(tenant, dto) {
        return await this.service.store(dto, tenant);
    }
    async destroy(tenant, id) {
        return await this.service.destroy(id, tenant);
    }
    async update(tenant, id, dto) {
        return await this.service.update(id, dto, tenant);
    }
    async updateDataAboutPasswordIncorrect(tenant, id) {
        return await this.service.updateDataAboutPasswordIncorrect(id, tenant);
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
], AccessPortalsController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccessPortalsController.prototype, "show", null);
__decorate([
    (0, common_1.Get)('/:id/show_with_decrypt_password'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccessPortalsController.prototype, "showWithDecryptPassword", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_or_update_dto_1.CreateOrUpdateDto]),
    __metadata("design:returntype", Promise)
], AccessPortalsController.prototype, "store", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccessPortalsController.prototype, "destroy", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_or_update_dto_1.CreateOrUpdateDto]),
    __metadata("design:returntype", Promise)
], AccessPortalsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('/:id/password_incorrect'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccessPortalsController.prototype, "updateDataAboutPasswordIncorrect", null);
AccessPortalsController = __decorate([
    (0, common_1.Controller)('access_portals'),
    __metadata("design:paramtypes", [access_portals_service_1.AccessPortalsService])
], AccessPortalsController);
exports.AccessPortalsController = AccessPortalsController;
//# sourceMappingURL=access_portals.controller.js.map