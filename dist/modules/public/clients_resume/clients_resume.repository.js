"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsResumeRepository = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
let ClientsResumeRepository = class ClientsResumeRepository {
    constructor(connection) {
        this.connection = connection;
    }
    async getDataCompanies(tenant, competence) {
        try {
            const sql = `
                SELECT COUNT(1) AS "qtd"

                  FROM "${tenant}".companie AS c

                 WHERE DATE(c."dateInicialAsClient") <= DATE($<competence>)
                   AND ( c."dateFinalAsClient" IS NULL OR DATE(c."dateFinalAsClient") > DATE($<competence>) )
            `;
            const result = await this.connection.query(sql, { competence });
            const data = result[0];
            return data;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.clients_resume', 'getDataFromLogNotaNFsGYN', __filename, error);
        }
    }
    async getQtdRecordsInAnyTable(tenant, tableName) {
        try {
            const sql = `
                SELECT COUNT(1) AS "qtd"

                  FROM "${tenant}"."${tableName}" AS c
            `;
            const result = await this.connection.query(sql, {});
            const data = result[0];
            return data;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.clients_resume', 'getQtdRecordsInAnyTable', __filename, error);
        }
    }
    async getDataFromLogNotaFiscalGO(tenant, competence) {
        try {
            const sql = `
                SELECT COALESCE( SUM(CASE WHEN log."typeLog" = 'success' THEN 1 ELSE 0 END), 0 ) AS "success",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'to_process' THEN 1 ELSE 0 END), 0 ) AS "to_process",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'error' THEN 1 ELSE 0 END), 0 ) AS "error",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'warning' THEN 1 ELSE 0 END), 0 ) AS "warning",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'processing' THEN 1 ELSE 0 END), 0 ) AS "processing",
                       COALESCE( SUM(1), 0 ) AS "total",
                       COALESCE( MAX(CASE WHEN log."typeLog" = 'success' THEN log."updatedAt" ELSE NULL END) ) AS "lastUpdatedSuccess"

                  FROM "${tenant}".log_nota_fiscal AS log
                 WHERE EXTRACT(MONTH FROM log."dateStartDown") = EXTRACT( MONTH FROM DATE($<competence>) )
                   AND EXTRACT(YEAR FROM log."dateStartDown") = EXTRACT( YEAR FROM DATE($<competence>) )
            `;
            const result = await this.connection.query(sql, { competence });
            const data = result[0];
            return data;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.clients_resume', 'getDataFromLogNotaFiscalGO', __filename, error);
        }
    }
    async getDataFromLogNotaNFsGYN(tenant, competence) {
        try {
            const sql = `
                SELECT COALESCE( SUM(CASE WHEN log."typeLog" = 'success' THEN 1 ELSE 0 END), 0 ) AS "success",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'to_process' THEN 1 ELSE 0 END), 0 ) AS "to_process",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'error' THEN 1 ELSE 0 END), 0 ) AS "error",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'warning' THEN 1 ELSE 0 END), 0 ) AS "warning",
                       COALESCE( SUM(CASE WHEN log."typeLog" = 'processing' THEN 1 ELSE 0 END), 0 ) AS "processing",
                       COALESCE( SUM(1), 0 ) AS "total",
                       COALESCE( MAX(CASE WHEN log."typeLog" = 'success' THEN log."updatedAt" ELSE NULL END) ) AS "lastUpdatedSuccess"

                  FROM "${tenant}".log_nfs_pref_gyn AS log
                 WHERE EXTRACT(MONTH FROM log."dateStartDown") = EXTRACT( MONTH FROM DATE($<competence>) )
                   AND EXTRACT(YEAR FROM log."dateStartDown") = EXTRACT( YEAR FROM DATE($<competence>) )
            `;
            const result = await this.connection.query(sql, { competence });
            const data = result[0];
            return data;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.clients_resume', 'getDataFromLogNotaNFsGYN', __filename, error);
        }
    }
};
ClientsResumeRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection])
], ClientsResumeRepository);
exports.ClientsResumeRepository = ClientsResumeRepository;
//# sourceMappingURL=clients_resume.repository.js.map