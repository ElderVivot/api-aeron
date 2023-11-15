"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TLogNfsPrefGynModule = void 0;
const s3_module_1 = require("../../../common/aws/s3/s3.module");
const connection_module_1 = require("../../../database/connection.module");
const companie_repository_1 = require("../companie/companie.repository");
const common_1 = require("@nestjs/common");
const log_nfs_pref_gyn_controller_1 = require("./log-nfs-pref-gyn.controller");
const log_nfs_pref_gyn_repository_1 = require("./log-nfs-pref-gyn.repository");
const log_nfs_pref_gyn_service_1 = require("./log-nfs-pref-gyn.service");
let TLogNfsPrefGynModule = class TLogNfsPrefGynModule {
};
TLogNfsPrefGynModule = __decorate([
    (0, common_1.Module)({
        imports: [connection_module_1.ConnectionModule, s3_module_1.AwsS3Module],
        controllers: [log_nfs_pref_gyn_controller_1.LogNfsPrefGynController],
        providers: [log_nfs_pref_gyn_service_1.LogNfsPrefGynService, log_nfs_pref_gyn_repository_1.LogNfsPrefGynRepository, companie_repository_1.CompanieRepository]
    })
], TLogNfsPrefGynModule);
exports.TLogNfsPrefGynModule = TLogNfsPrefGynModule;
//# sourceMappingURL=log-nfs-pref-gyn.module.js.map