"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TLogNotaFiscalGoEntModule = void 0;
const s3_module_1 = require("../../../common/aws/s3/s3.module");
const connection_module_1 = require("../../../database/connection.module");
const companie_repository_1 = require("../companie/companie.repository");
const common_1 = require("@nestjs/common");
const log_nota_fiscal_controller_1 = require("./log-nota-fiscal.controller");
const log_nota_fiscal_repository_1 = require("./log-nota-fiscal.repository");
const log_nota_fiscal_service_1 = require("./log-nota-fiscal.service");
let TLogNotaFiscalGoEntModule = class TLogNotaFiscalGoEntModule {
};
TLogNotaFiscalGoEntModule = __decorate([
    (0, common_1.Module)({
        imports: [connection_module_1.ConnectionModule, s3_module_1.AwsS3Module],
        controllers: [log_nota_fiscal_controller_1.LogNotaFiscalController],
        providers: [log_nota_fiscal_service_1.LogNotaFiscalService, log_nota_fiscal_repository_1.LogNotaFiscalRepository, companie_repository_1.CompanieRepository]
    })
], TLogNotaFiscalGoEntModule);
exports.TLogNotaFiscalGoEntModule = TLogNotaFiscalGoEntModule;
//# sourceMappingURL=log-nota-fiscal.module.js.map