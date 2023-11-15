"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCompanieModule = void 0;
const connection_module_1 = require("../../../database/connection.module");
const city_repository_1 = require("../../public/city/city.repository");
const state_repository_1 = require("../../public/state/state.repository");
const common_1 = require("@nestjs/common");
const companie_controller_1 = require("./companie.controller");
const companie_repository_1 = require("./companie.repository");
const companie_service_1 = require("./companie.service");
let TCompanieModule = class TCompanieModule {
};
TCompanieModule = __decorate([
    (0, common_1.Module)({
        imports: [connection_module_1.ConnectionModule],
        controllers: [companie_controller_1.CompanieController],
        providers: [companie_service_1.CompanieService, companie_repository_1.CompanieRepository, city_repository_1.CityRepository, state_repository_1.StateRepository]
    })
], TCompanieModule);
exports.TCompanieModule = TCompanieModule;
//# sourceMappingURL=companie.module.js.map