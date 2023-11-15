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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const crypt_1 = require("../../../common/adapters/crypt");
const date_factory_1 = require("../../../common/adapters/date/date-factory");
const generate_hash_1 = require("../../../common/adapters/generate-hash");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const common_1 = require("@nestjs/common");
const client_repository_1 = require("../client/client.repository");
const reset_password_entity_1 = require("./reset-password.entity");
const reset_password_repository_1 = require("./reset-password.repository");
const user_permissions_entity_1 = require("./user-permissions.entity");
const user_entity_1 = require("./user.entity");
const user_repository_1 = require("./user.repository");
let UserService = class UserService {
    constructor(repository, resetPasswordRepository, clientRepository) {
        this.repository = repository;
        this.resetPasswordRepository = resetPasswordRepository;
        this.clientRepository = clientRepository;
        this.makeGeneratePasswordImplementation = (0, generate_hash_1.makeGeneratePasswordImplementation)();
        this.cryptImplementation = (0, crypt_1.makeCryptImplementation)();
        this.dateImplementation = (0, date_factory_1.makeDateImplementation)();
    }
    async index(idClient, getUserDto) {
        try {
            const client = await this.clientRepository.show(idClient);
            if (client instanceof make_error_request_response_1.ErrorRequestResponse)
                throw client;
            return await this.repository.index(idClient, getUserDto);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'index', __filename, error);
        }
    }
    async getListUsername(username) {
        try {
            const listUsers = await this.repository.getListUsername(username);
            if (listUsers instanceof make_error_request_response_1.ErrorRequestResponse)
                throw listUsers;
            return listUsers;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'getListUsername', __filename, error);
        }
    }
    async store(createUserDto) {
        try {
            const { isUserMain, departaments, dataListPermissions } = createUserDto;
            let user = new user_entity_1.User();
            user = Object.assign(user, createUserDto);
            const password = this.makeGeneratePasswordImplementation.generatePassword();
            const passwordCrypt = await this.cryptImplementation.hash(password);
            user.password = passwordCrypt;
            user.nickName = user.nickName || user.name.split(' ')[0];
            user.active = true;
            user.tenantQueroConhecer = user.tenantQueroConhecer || '';
            if (isUserMain)
                user.isUserMain = true;
            else
                user.isUserMain = false;
            if (!departaments)
                user.departaments = 'folha,fiscal,contabil';
            else
                user.departaments = departaments;
            const userCreated = await this.repository.store(user);
            if (userCreated instanceof make_error_request_response_1.ErrorRequestResponse)
                throw userCreated;
            const { idUser } = userCreated;
            if (dataListPermissions && dataListPermissions.length > 0) {
                for (const permission of dataListPermissions) {
                    try {
                        let userClientPermissions = new user_permissions_entity_1.UserClientPermissions();
                        userClientPermissions = Object.assign(userClientPermissions, permission);
                        userClientPermissions.idUser = idUser;
                        userClientPermissions.createdAt = new Date();
                        userClientPermissions.updatedAt = userClientPermissions.createdAt;
                        await this.repository.addPermissions(userClientPermissions);
                    }
                    catch (error) {
                        await this.repository.delete(idUser);
                        throw error;
                    }
                }
            }
            const userPermissions = await this.repository.getUserPermissions(idUser);
            if (userPermissions instanceof make_error_request_response_1.ErrorRequestResponse)
                throw userPermissions;
            userCreated.roles = userPermissions;
            return userCreated;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'store', __filename, error);
        }
    }
    async show(dto) {
        const user = await this.repository.show(dto);
        if (user instanceof make_error_request_response_1.ErrorRequestResponse)
            throw user;
        user.password = '';
        const userPermissions = await this.repository.getUserPermissions(user.idUser);
        if (userPermissions instanceof make_error_request_response_1.ErrorRequestResponse)
            throw userPermissions;
        user.roles = userPermissions;
        return user;
    }
    async confirmRegistration(id, dto) {
        try {
            let user = await this.show({ idUser: id });
            if (user instanceof make_error_request_response_1.ErrorRequestResponse)
                throw user;
            if (user.confirmedRegistration) {
                throw new Error('User already confirmed registration before');
            }
            user = Object.assign(user, dto);
            const { password } = dto;
            const passwordCrypt = await this.cryptImplementation.hash(password);
            user.password = passwordCrypt;
            user.confirmedRegistration = true;
            user.active = true;
            return await this.repository.confirmRegistration(id, user);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'confirmRegistration', __filename, error);
        }
    }
    async update(id, dto) {
        try {
            const { isUserMain, departaments, dataListPermissions } = dto;
            let user = await this.show({ idUser: id });
            if (user instanceof make_error_request_response_1.ErrorRequestResponse)
                throw user;
            if (isUserMain)
                user.isUserMain = true;
            if (departaments)
                user.departaments = departaments;
            user = Object.assign(user, dto);
            if (user instanceof make_error_request_response_1.ErrorRequestResponse)
                throw user;
            user.updatedAt = new Date();
            await this.repository.update(id, user);
            if (dataListPermissions && dataListPermissions.length > 0) {
                for (const permission of dataListPermissions) {
                    if (permission.idUserPermissions) {
                        await this.repository.updatePermissions({
                            idUserPermissions: permission.idUserPermissions,
                            idUser: id,
                            updatedAt: new Date(),
                            functionality: permission.functionality,
                            permissions: permission.permissions
                        });
                    }
                    else {
                        let userClientPermissions = new user_permissions_entity_1.UserClientPermissions();
                        userClientPermissions = Object.assign(userClientPermissions, permission);
                        userClientPermissions.idUser = id;
                        userClientPermissions.createdAt = new Date();
                        userClientPermissions.updatedAt = userClientPermissions.createdAt;
                        await this.repository.addPermissions(userClientPermissions);
                    }
                }
            }
            return await this.show({ idUser: id });
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'update', __filename, error);
        }
    }
    async sendInformationToResetPassword(username) {
        try {
            const user = await this.repository.show({ username });
            if (user instanceof make_error_request_response_1.ErrorRequestResponse)
                throw user;
            const userResetPassword = new reset_password_entity_1.ResetPassword();
            userResetPassword.used = false;
            userResetPassword.idUser = user.idUser;
            return this.resetPasswordRepository.sendInformationToResetPassword(userResetPassword);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'sendInformationToResetPassword', __filename, error);
        }
    }
    async resetPassword(idResetPassword, dto) {
        try {
            const resetPassword = await this.resetPasswordRepository.showResetPasswordNotUsed(idResetPassword);
            if (resetPassword instanceof make_error_request_response_1.ErrorRequestResponse) {
                throw new common_1.NotFoundException("It's not possible reset password because this link used before or not valid");
            }
            const nowLessFourHours = this.dateImplementation.subHours(new Date(), 4);
            if (nowLessFourHours > resetPassword.createdAt) {
                throw new Error('Expire time to reset password, the time valid is four hours after the link was sent');
            }
            const { password } = dto;
            const passwordCrypt = await this.cryptImplementation.hash(password);
            const { idUser } = resetPassword;
            await this.repository.updatePassword(idUser, passwordCrypt);
            return await this.resetPasswordRepository.resetPassword(idResetPassword);
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.user_client', 'resetPassword', __filename, error);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        reset_password_repository_1.ResetPasswordRepository,
        client_repository_1.ClientRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map