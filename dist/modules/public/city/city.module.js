"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModule = void 0;
const connection_module_1 = require("../../../database/connection.module");
const common_1 = require("@nestjs/common");
const state_repository_1 = require("../state/state.repository");
const city_controller_1 = require("./city.controller");
const city_repository_1 = require("./city.repository");
const city_service_1 = require("./city.service");
let CityModule = class CityModule {
};
CityModule = __decorate([
    (0, common_1.Module)({
        imports: [connection_module_1.ConnectionModule],
        controllers: [city_controller_1.CityController],
        providers: [city_service_1.CityService, city_repository_1.CityRepository, state_repository_1.StateRepository],
        exports: [city_repository_1.CityRepository]
    })
], CityModule);
exports.CityModule = CityModule;
//# sourceMappingURL=city.module.js.map