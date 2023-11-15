"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModule = void 0;
const connection_module_1 = require("../../../database/connection.module");
const common_1 = require("@nestjs/common");
const city_repository_1 = require("../city/city.repository");
const state_repository_1 = require("../state/state.repository");
const user_repository_1 = require("../user_client/user.repository");
const client_controller_1 = require("./client.controller");
const client_repository_1 = require("./client.repository");
const client_service_1 = require("./client.service");
let ClientModule = class ClientModule {
};
ClientModule = __decorate([
    (0, common_1.Module)({
        imports: [connection_module_1.ConnectionModule],
        controllers: [client_controller_1.ClientController],
        providers: [client_service_1.ClientService, client_repository_1.ClientRepository, city_repository_1.CityRepository, state_repository_1.StateRepository, user_repository_1.UserRepository]
    })
], ClientModule);
exports.ClientModule = ClientModule;
//# sourceMappingURL=client.module.js.map