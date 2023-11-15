"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCertificateModule = void 0;
const s3_module_1 = require("../../../common/aws/s3/s3.module");
const connection_module_1 = require("../../../database/connection.module");
const city_repository_1 = require("../../public/city/city.repository");
const state_repository_1 = require("../../public/state/state.repository");
const common_1 = require("@nestjs/common");
const certificate_controller_1 = require("./certificate.controller");
const certificate_repository_1 = require("./certificate.repository");
const certificate_service_1 = require("./certificate.service");
let TCertificateModule = class TCertificateModule {
};
TCertificateModule = __decorate([
    (0, common_1.Module)({
        imports: [connection_module_1.ConnectionModule, s3_module_1.AwsS3Module],
        controllers: [certificate_controller_1.CertificateController],
        providers: [certificate_service_1.CertificateService, certificate_repository_1.CertificateRepository, city_repository_1.CityRepository, state_repository_1.StateRepository]
    })
], TCertificateModule);
exports.TCertificateModule = TCertificateModule;
//# sourceMappingURL=certificate.module.js.map