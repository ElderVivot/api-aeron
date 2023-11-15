"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TUserPortalsHasAccessModule = void 0;
const connection_module_1 = require("../../../database/connection.module");
const common_1 = require("@nestjs/common");
const user_portals_has_access_controller_1 = require("./user_portals_has_access.controller");
const user_portals_has_access_repository_1 = require("./user_portals_has_access.repository");
const user_portals_has_access_service_1 = require("./user_portals_has_access.service");
let TUserPortalsHasAccessModule = class TUserPortalsHasAccessModule {
};
TUserPortalsHasAccessModule = __decorate([
    (0, common_1.Module)({
        imports: [connection_module_1.ConnectionModule],
        controllers: [user_portals_has_access_controller_1.UserPortalsHasAccessController],
        providers: [user_portals_has_access_service_1.UserPortalsHasAccessService, user_portals_has_access_repository_1.UserPortalsHasAccessRepository]
    })
], TUserPortalsHasAccessModule);
exports.TUserPortalsHasAccessModule = TUserPortalsHasAccessModule;
//# sourceMappingURL=user_portals_has_access.module.js.map