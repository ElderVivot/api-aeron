"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsResumeModule = void 0;
const connection_module_1 = require("../../../database/connection.module");
const common_1 = require("@nestjs/common");
const client_repository_1 = require("../client/client.repository");
const clients_resume_controller_1 = require("./clients_resume.controller");
const clients_resume_repository_1 = require("./clients_resume.repository");
const clients_resume_service_1 = require("./clients_resume.service");
let ClientsResumeModule = class ClientsResumeModule {
};
ClientsResumeModule = __decorate([
    (0, common_1.Module)({
        imports: [connection_module_1.ConnectionModule],
        controllers: [clients_resume_controller_1.ClientsResumeController],
        providers: [clients_resume_service_1.ClientsResumeService, clients_resume_repository_1.ClientsResumeRepository, client_repository_1.ClientRepository]
    })
], ClientsResumeModule);
exports.ClientsResumeModule = ClientsResumeModule;
//# sourceMappingURL=clients_resume.module.js.map