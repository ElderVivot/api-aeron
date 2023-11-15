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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const validation_custom_pipe_1 = require("../../../common/pipes/validation-custom.pipe");
const client_service_1 = require("./client.service");
const add_user_dto_1 = require("./dto/add-user.dto");
const create_or_update_client_dto_1 = require("./dto/create-or-update-client.dto");
const get_client_filter_dto_1 = require("./dto/get-client-filter.dto");
let ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async index(filterDto) {
        return this.clientService.index(filterDto);
    }
    async show(id) {
        return await this.clientService.show(id);
    }
    async store(createOrUpdateClientDto) {
        return await this.clientService.store(createOrUpdateClientDto);
    }
    async destroy(id) {
        return await this.clientService.destroy(id);
    }
    async update(id, createOrUpdateClientDto) {
        return await this.clientService.update(id, createOrUpdateClientDto);
    }
    async addUsers(id, addUsersDto) {
        return await this.clientService.addUsers(id, addUsersDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_client_filter_dto_1.GetClientFilterDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_or_update_client_dto_1.CreateOrUpdateClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "store", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "destroy", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_or_update_client_dto_1.CreateOrUpdateClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('/:id/add_users'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_user_dto_1.AddUserDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "addUsers", null);
ClientController = __decorate([
    (0, common_1.Controller)('client'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map