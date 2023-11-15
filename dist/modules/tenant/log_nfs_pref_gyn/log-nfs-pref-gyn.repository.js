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
exports.LogNfsPrefGynRepository = void 0;
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
let LogNfsPrefGynRepository = class LogNfsPrefGynRepository {
    constructor(connection) {
        this.connection = connection;
    }
    async index(dto, tenant) {
        const { _page, _limit, idCompanie, dateStartDown, dateEndDown, typeLog, dateStartDownBetween, dateEndDownBetween, cityRegistration, getPaswordIncorrect, cityRegistrationList, codeCompanies, login, competence, nameCompanie } = dto;
        try {
            let sql = `
                SELECT log_nfs_pref_gyn.*, access_portals."login", access_portals."nameAccess",
                       CASE WHEN companie."name" IS NULL THEN log_nfs_pref_gyn."nameCompanie" ELSE companie."name" END AS "nameCompanieCorrect",
                       companie."federalRegistration", companie."codeCompanieAccountSystem"
                FROM "${tenant}".log_nfs_pref_gyn AS log_nfs_pref_gyn
                     INNER JOIN "${tenant}".access_portals AS access_portals ON access_portals."idAccessPortals" = log_nfs_pref_gyn."idAccessPortals"
                     LEFT JOIN "${tenant}".companie AS companie ON companie."idCompanie" = log_nfs_pref_gyn."idCompanie"
                WHERE log_nfs_pref_gyn."idLogNfsPrefGyn" IS NOT NULL
            `;
            if (typeLog)
                sql = sql + '\nAND log_nfs_pref_gyn."typeLog" = $<typeLog>';
            if (idCompanie)
                sql = sql + '\nAND log_nfs_pref_gyn."idCompanie" = $<idCompanie>';
            if (cityRegistration)
                sql = sql + '\nAND log_nfs_pref_gyn."cityRegistration" = $<cityRegistration>';
            if (dateStartDown)
                sql = sql + '\nAND DATE(log_nfs_pref_gyn."dateStartDown") = DATE($<dateStartDown>)';
            if (dateEndDown)
                sql = sql + '\nAND DATE(log_nfs_pref_gyn."dateEndDown") = DATE($<dateEndDown>)';
            if (dateStartDownBetween)
                sql = sql + '\nAND DATE(log_nfs_pref_gyn."dateStartDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)';
            if (dateEndDownBetween)
                sql = sql + '\nAND DATE(log_nfs_pref_gyn."dateEndDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)';
            if (getPaswordIncorrect && getPaswordIncorrect === 'no') {
                sql = sql + 'AND ( access_portals."timestampPasswordIncorrect" IS NULL OR access_portals."timestampPasswordIncorrect" < access_portals."updatedAt" )';
            }
            if (codeCompanies)
                sql = sql + `\nAND companie."codeCompanieAccountSystem" IN (${codeCompanies})`;
            if (cityRegistrationList)
                sql = sql + `\nAND log_nfs_pref_gyn."cityRegistration" IN (${cityRegistrationList})`;
            if (nameCompanie)
                sql = sql + '\nAND companie."name" LIKE \'%\' || $<nameCompanie> || \'%\'';
            if (login)
                sql = sql + 'AND access_portals."login" = $<login>';
            if (competence) {
                sql = sql + `
                    AND EXTRACT(MONTH FROM log_nfs_pref_gyn."dateStartDown") = EXTRACT( MONTH FROM DATE($<competence>) )
                    AND EXTRACT(YEAR FROM log_nfs_pref_gyn."dateStartDown") = EXTRACT( YEAR FROM DATE($<competence>) )
                `;
            }
            sql = sql + '\nORDER BY log_nfs_pref_gyn."cityRegistration", log_nfs_pref_gyn."dateStartDown", log_nfs_pref_gyn."dateEndDown"';
            const page = Number(_page);
            const limit = Number(_limit);
            let _offset = 0;
            if (page && limit) {
                if (page > 1)
                    _offset = (page - 1) * limit;
                sql = sql + `
                    LIMIT $<_limit>
                    OFFSET $<_offset>
                `;
            }
            const result = await this.connection.query(sql, { ...dto, _offset });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nfs_pref_gyn`, 'index', __filename, error);
        }
    }
    async indexCountWithoutFilterPage(dto, tenant) {
        const { idCompanie, dateStartDown, dateEndDown, typeLog, dateStartDownBetween, dateEndDownBetween, cityRegistration, getPaswordIncorrect, cityRegistrationList, codeCompanies, login, competence, nameCompanie } = dto;
        try {
            let sql = `
                SELECT COUNT(1)
                FROM "${tenant}".log_nfs_pref_gyn AS log_nfs_pref_gyn
                     INNER JOIN "${tenant}".access_portals AS access_portals ON access_portals."idAccessPortals" = log_nfs_pref_gyn."idAccessPortals"
                     LEFT JOIN "${tenant}".companie AS companie ON companie."idCompanie" = log_nfs_pref_gyn."idCompanie"
                WHERE log_nfs_pref_gyn."idLogNfsPrefGyn" IS NOT NULL
            `;
            if (typeLog)
                sql = sql + '\nAND log_nfs_pref_gyn."typeLog" = $<typeLog>';
            if (idCompanie)
                sql = sql + '\nAND log_nfs_pref_gyn."idCompanie" = $<idCompanie>';
            if (cityRegistration)
                sql = sql + '\nAND log_nfs_pref_gyn."cityRegistration" = $<cityRegistration>';
            if (dateStartDown)
                sql = sql + '\nAND DATE(log_nfs_pref_gyn."dateStartDown") = DATE($<dateStartDown>)';
            if (dateEndDown)
                sql = sql + '\nAND DATE(log_nfs_pref_gyn."dateEndDown") = DATE($<dateEndDown>)';
            if (dateStartDownBetween)
                sql = sql + '\nAND DATE(log_nfs_pref_gyn."dateStartDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)';
            if (dateEndDownBetween)
                sql = sql + '\nAND DATE(log_nfs_pref_gyn."dateEndDown") BETWEEN DATE($<dateStartDownBetween>) AND DATE($<dateEndDownBetween>)';
            if (getPaswordIncorrect && getPaswordIncorrect === 'no') {
                sql = sql + 'AND ( access_portals."timestampPasswordIncorrect" IS NULL OR access_portals."timestampPasswordIncorrect" < access_portals."updatedAt" )';
            }
            if (codeCompanies)
                sql = sql + `\nAND companie."codeCompanieAccountSystem" IN (${codeCompanies})`;
            if (cityRegistrationList)
                sql = sql + `\nAND log_nfs_pref_gyn."cityRegistration" IN (${cityRegistrationList})`;
            if (nameCompanie)
                sql = sql + '\nAND companie."name" LIKE \'%\' || $<nameCompanie> || \'%\'';
            if (login)
                sql = sql + 'AND access_portals."login" = $<login>';
            if (competence) {
                sql = sql + `
                    AND EXTRACT(MONTH FROM log_nfs_pref_gyn."dateStartDown") = EXTRACT( MONTH FROM DATE($<competence>) )
                    AND EXTRACT(YEAR FROM log_nfs_pref_gyn."dateStartDown") = EXTRACT( YEAR FROM DATE($<competence>) )
                `;
            }
            const result = await this.connection.one(sql, { ...dto });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nfs_pref_gyn`, 'index', __filename, error);
        }
    }
    async show(idLogNfsPrefGyn, tenant) {
        try {
            const sql = `
                SELECT log_nfs_pref_gyn.*
                FROM "${tenant}".log_nfs_pref_gyn AS log_nfs_pref_gyn
                WHERE "idLogNfsPrefGyn" = $<idLogNfsPrefGyn>
            `;
            const result = await this.connection.query(sql, { idLogNfsPrefGyn });
            if (!result || result.length === 0)
                throw new common_1.NotFoundException(`LogNfsPrefGyn with ID ${idLogNfsPrefGyn} not found`);
            const client = result[0];
            return client;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nfs_pref_gyn`, 'show', __filename, error);
        }
    }
    async store(logNotaFiscal, tenant) {
        try {
            const sql = `
                INSERT INTO "${tenant}".log_nfs_pref_gyn("idLogNfsPrefGyn", "idAccessPortals", "idCompanie", "createdAt", "updatedAt", 
                       "cityRegistration", "nameCompanie", "dateStartDown", "dateEndDown", "typeLog", "messageLog", "messageLogToShowUser", 
                       "messageError", "qtdNotesDown", "qtdTimesReprocessed", "urlPrintLog", "urlsXmls")
                VALUES ($<idLogNfsPrefGyn>, $<idAccessPortals>, $<idCompanie>, $<createdAt>, $<updatedAt>, $<cityRegistration>, $<nameCompanie>,
                        $<dateStartDown>, $<dateEndDown>, $<typeLog>, $<messageLog>, $<messageLogToShowUser>, $<messageError>,
                        $<qtdNotesDown>, $<qtdTimesReprocessed>, $<urlPrintLog>, $<urlsXmls>)
                RETURNING "idLogNfsPrefGyn"
            `;
            const result = await this.connection.one(sql, { ...logNotaFiscal });
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nfs_pref_gyn`, 'store', __filename, error);
        }
    }
    async update(logNotaFiscal, tenant) {
        try {
            const sql = `
                UPDATE "${tenant}".log_nfs_pref_gyn
                SET "updatedAt" = $<updatedAt>, 
                    "dateStartDown" = $<dateStartDown>, "dateEndDown" = $<dateEndDown>, "typeLog" = $<typeLog>, "messageLog" = $<messageLog>,
                    "messageLogToShowUser" = $<messageLogToShowUser>, "messageError" = $<messageError>, 
                    "qtdNotesDown" = $<qtdNotesDown>, "qtdTimesReprocessed" = $<qtdTimesReprocessed>, "urlPrintLog" = $<urlPrintLog", 
                    "urlsXmls" = $<urlsXmls"
                WHERE "idLogNfsPrefGyn" = $<idLogNfsPrefGyn>
            `;
            await this.connection.result(sql, { ...logNotaFiscal });
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nfs_pref_gyn`, 'update', __filename, error);
        }
    }
    async updateUrlPrintLog(idLogNfsPrefGyn, urlPrintLog, tenant) {
        try {
            const sql = `
                UPDATE "${tenant}".log_nfs_pref_gyn
                SET "urlPrintLog" = $<urlPrintLog>
                WHERE "idLogNfsPrefGyn" = $<idLogNfsPrefGyn>
            `;
            await this.connection.result(sql, { idLogNfsPrefGyn, urlPrintLog });
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.log_nfs_pref_gyn`, 'updateUrlPrintLog', __filename, error);
        }
    }
};
LogNfsPrefGynRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection])
], LogNfsPrefGynRepository);
exports.LogNfsPrefGynRepository = LogNfsPrefGynRepository;
//# sourceMappingURL=log-nfs-pref-gyn.repository.js.map