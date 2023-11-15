"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./modules/public/auth/auth.module");
const city_module_1 = require("./modules/public/city/city.module");
const client_module_1 = require("./modules/public/client/client.module");
const clients_resume_module_1 = require("./modules/public/clients_resume/clients_resume.module");
const migration_module_1 = require("./modules/public/migrations/migration.module");
const quero_conhecer_module_1 = require("./modules/public/quero_conhecer/quero_conhecer.module");
const state_module_1 = require("./modules/public/state/state.module");
const user_module_1 = require("./modules/public/user_client/user.module");
const access_portals_module_1 = require("./modules/tenant/access_portals/access_portals.module");
const certificate_module_1 = require("./modules/tenant/certificate/certificate.module");
const companie_module_1 = require("./modules/tenant/companie/companie.module");
const log_nfs_pref_gyn_module_1 = require("./modules/tenant/log_nfs_pref_gyn/log-nfs-pref-gyn.module");
const log_nota_fiscal_module_1 = require("./modules/tenant/log_nota_fiscal_go_ent/log-nota-fiscal.module");
const log_nota_fiscal_module_2 = require("./modules/tenant/log_nota_fiscal/log-nota-fiscal.module");
const user_portals_has_access_module_1 = require("./modules/tenant/user_portals_has_access/user_portals_has_access.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            client_module_1.ClientModule,
            state_module_1.StateModule,
            city_module_1.CityModule,
            user_module_1.UserClientModule,
            migration_module_1.MigrationModule,
            auth_module_1.AuthModule,
            quero_conhecer_module_1.QueroConhecerModule,
            clients_resume_module_1.ClientsResumeModule,
            companie_module_1.TCompanieModule,
            certificate_module_1.TCertificateModule,
            log_nota_fiscal_module_2.TLogNotaFiscalModule,
            log_nfs_pref_gyn_module_1.TLogNfsPrefGynModule,
            access_portals_module_1.TAccessPortalsModule,
            log_nota_fiscal_module_1.TLogNotaFiscalGoEntModule,
            user_portals_has_access_module_1.TUserPortalsHasAccessModule
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map