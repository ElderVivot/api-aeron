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
exports.UserPortalsHasAccessController = void 0;
const validation_custom_pipe_1 = require("../../../common/pipes/validation-custom.pipe");
const common_1 = require("@nestjs/common");
const create_or_update_dto_1 = require("./dto/create-or-update.dto");
const filter_dto_1 = require("./dto/filter.dto");
const user_portals_has_access_service_1 = require("./user_portals_has_access.service");
let UserPortalsHasAccessController = class UserPortalsHasAccessController {
    constructor(service) {
        this.service = service;
    }
    async index(tenant, dto) {
        return this.service.index(dto, tenant);
    }
    async show(tenant, id) {
        return await this.service.show(id, tenant);
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
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Query)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], UserPortalsHasAccessController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserPortalsHasAccessController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_or_update_dto_1.CreateOrUpdateDto]),
    __metadata("design:returntype", Promise)
], UserPortalsHasAccessController.prototype, "store", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserPortalsHasAccessController.prototype, "destroy", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Headers)('tenant')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_or_update_dto_1.CreateOrUpdateDto]),
    __metadata("design:returntype", Promise)
], UserPortalsHasAccessController.prototype, "update", null);
UserPortalsHasAccessController = __decorate([
    (0, common_1.Controller)('user_portals_has_access'),
    __metadata("design:paramtypes", [user_portals_has_access_service_1.UserPortalsHasAccessService])
], UserPortalsHasAccessController);
exports.UserPortalsHasAccessController = UserPortalsHasAccessController;
//# sourceMappingURL=user_portals_has_access.controller.js.map