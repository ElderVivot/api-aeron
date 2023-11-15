"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateModule = void 0;
const connection_module_1 = require("../../../database/connection.module");
const common_1 = require("@nestjs/common");
const state_controller_1 = require("./state.controller");
const state_repository_1 = require("./state.repository");
const state_service_1 = require("./state.service");
let StateModule = class StateModule {
};
StateModule = __decorate([
    (0, common_1.Module)({
        imports: [connection_module_1.ConnectionModule],
        controllers: [state_controller_1.StateController],
        providers: [state_service_1.StateService, state_repository_1.StateRepository],
        exports: [state_repository_1.StateRepository]
    })
], StateModule);
exports.StateModule = StateModule;
//# sourceMappingURL=state.module.js.map