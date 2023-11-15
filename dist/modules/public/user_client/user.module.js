"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClientModule = void 0;
const connection_module_1 = require("../../../database/connection.module");
const common_1 = require("@nestjs/common");
const client_repository_1 = require("../client/client.repository");
const reset_password_repository_1 = require("./reset-password.repository");
const user_controller_1 = require("./user.controller");
const user_repository_1 = require("./user.repository");
const user_service_1 = require("./user.service");
let UserClientModule = class UserClientModule {
};
UserClientModule = __decorate([
    (0, common_1.Module)({
        imports: [connection_module_1.ConnectionModule],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, user_repository_1.UserRepository, reset_password_repository_1.ResetPasswordRepository, client_repository_1.ClientRepository]
    })
], UserClientModule);
exports.UserClientModule = UserClientModule;
//# sourceMappingURL=user.module.js.map