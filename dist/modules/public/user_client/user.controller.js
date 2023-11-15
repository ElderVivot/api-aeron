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
exports.UserController = void 0;
const validation_custom_pipe_1 = require("../../../common/pipes/validation-custom.pipe");
const common_1 = require("@nestjs/common");
const confirm_registration_dto_1 = require("./dto/confirm-registration.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const get_user_dto_1 = require("./dto/get-user.dto");
const reset_password_1 = require("./dto/reset-password");
const show_user_dto_1 = require("./dto/show-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    async index(idClient, dto) {
        return await this.service.index(idClient, dto);
    }
    async getListUsername(username) {
        return await this.service.getListUsername(username);
    }
    async store(createUserDto) {
        return await this.service.store(createUserDto);
    }
    async show(showUserDto) {
        return await this.service.show(showUserDto);
    }
    async showWithId(id) {
        return await this.service.show({ idUser: id });
    }
    async confirmRegistration(id, dto) {
        return await this.service.confirmRegistration(id, dto);
    }
    async update(id, dto) {
        return await this.service.update(id, dto);
    }
    async sendInformationToResetPassword(username) {
        return await this.service.sendInformationToResetPassword(username);
    }
    async resetPassword(idResetPassword, dto) {
        return await this.service.resetPassword(idResetPassword, dto);
    }
};
__decorate([
    (0, common_1.Get)(':idClient/list_users'),
    __param(0, (0, common_1.Param)('idClient', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_user_dto_1.GetUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "index", null);
__decorate([
    (0, common_1.Get)(':username/get_list_username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getListUsername", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "store", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [show_user_dto_1.ShowUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "show", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "showWithId", null);
__decorate([
    (0, common_1.Put)('/:id/confirm_registration'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, confirm_registration_dto_1.ConfirmRegistrationDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmRegistration", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('/:username/send_reset_password'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendInformationToResetPassword", null);
__decorate([
    (0, common_1.Patch)('/:id_reset_password/reset_password'),
    __param(0, (0, common_1.Param)('id_reset_password', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(validation_custom_pipe_1.ValidationPipeCustom)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reset_password_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
UserController = __decorate([
    (0, common_1.Controller)('user_client'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map