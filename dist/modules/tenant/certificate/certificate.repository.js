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
exports.CertificateRepository = void 0;
const make_deleted_success_1 = require("../../../common/factories/make-deleted-success");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const connection_1 = require("../../../database/connection");
const common_1 = require("@nestjs/common");
let CertificateRepository = class CertificateRepository {
    constructor(connection) {
        this.connection = connection;
    }
    async index(dto, tenant) {
        const { nameCert, endDateValidity, federalRegistration, hasProcurationEcac } = dto;
        try {
            let sql = `
                SELECT certificate.*, companie."codeCompanieAccountSystem", 
                       CASE WHEN companie."status" IS NULL THEN 'DONT_FIND' ELSE companie."status" END AS "statusCompanie",
                       CASE WHEN certificate."endDateValidity" < now() THEN 'OVERDUE' ELSE 'ACTIVE' END AS "statusCert"
                FROM "${tenant}".certificate AS certificate
                     LEFT JOIN "${tenant}".companie AS companie
                         ON    companie."federalRegistration" = certificate."federalRegistration"                  
                WHERE certificate."idCertificate" IS NOT NULL
            `;
            if (nameCert)
                sql = sql + 'AND certificate."nameCert" LIKE \'%\' || $<nameCert> || \'%\'';
            if (federalRegistration)
                sql = sql + 'AND certificate."federalRegistration" = $<federalRegistration>';
            if (hasProcurationEcac && hasProcurationEcac === '1')
                sql = sql + 'AND certificate."hasProcurationEcac" = true';
            if (endDateValidity)
                sql = sql + 'AND DATE(certificate."endDateValidity") >= DATE($<endDateValidity>)';
            sql = sql + '\nORDER BY certificate."eCpfCnpj" DESC';
            const result = await this.connection.query(sql, { nameCert, federalRegistration, endDateValidity });
            const clients = result;
            return clients;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'index', __filename, error);
        }
    }
    async getListCertificateNotOverdue(dto, tenant) {
        const { nameCert, endDateValidity, federalRegistration, hasProcurationEcac } = dto;
        try {
            let sql = `
                SELECT certificate."federalRegistration"
                FROM "${tenant}".certificate AS certificate                
                WHERE certificate."endDateValidity" > now()
            `;
            if (nameCert)
                sql = sql + 'AND certificate."nameCert" LIKE \'%\' || $<nameCert> || \'%\'';
            if (federalRegistration)
                sql = sql + 'AND certificate."federalRegistration" = $<federalRegistration>';
            if (hasProcurationEcac && hasProcurationEcac === '1')
                sql = sql + 'AND certificate."hasProcurationEcac" = true';
            if (endDateValidity)
                sql = sql + 'AND DATE(certificate."endDateValidity") >= DATE($<endDateValidity>)';
            const result = await this.connection.query(sql, { nameCert, federalRegistration, endDateValidity });
            const clients = result;
            return clients;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'index', __filename, error);
        }
    }
    async indexToFront(dto, tenant) {
        const { nameCert, endDateValidity, federalRegistration, hasProcurationEcac, codeCompanies, statusCert, federalRegistrationPartial, _limit, _page } = dto;
        try {
            let sql = `
                SELECT certificate.*, companie."codeCompanieAccountSystem", 
                       CASE WHEN companie."status" IS NULL THEN 'DONT_FIND' ELSE companie."status" END AS "statusCompanie",
                       CASE WHEN certificate."endDateValidity" < now() THEN 'OVERDUE' ELSE 'ACTIVE' END AS "statusCert"
                FROM "${tenant}".certificate AS certificate
                     LEFT JOIN "${tenant}".companie AS companie
                         ON    companie."federalRegistration" = certificate."federalRegistration"                  
                WHERE certificate."idCertificate" IS NOT NULL
            `;
            if (nameCert)
                sql = sql + 'AND certificate."nameCert" LIKE \'%\' || $<nameCert> || \'%\'';
            if (federalRegistration)
                sql = sql + 'AND certificate."federalRegistration" = $<federalRegistration>';
            if (federalRegistrationPartial)
                sql = sql + 'AND certificate."federalRegistration" LIKE \'%\' || $<federalRegistrationPartial> || \'%\'';
            if (hasProcurationEcac && hasProcurationEcac === '1')
                sql = sql + 'AND certificate."hasProcurationEcac" = true';
            if (endDateValidity)
                sql = sql + 'AND DATE(certificate."endDateValidity") >= DATE($<endDateValidity>)';
            if (statusCert)
                sql = sql + 'AND CASE WHEN certificate."endDateValidity" < now() THEN \'OVERDUE\' ELSE \'ACTIVE\' END = $<statusCert>';
            if (codeCompanies)
                sql = sql + `\nAND companie."codeCompanieAccountSystem" IN (${codeCompanies})`;
            sql = sql + '\nORDER BY certificate."nameCert"';
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
            const certificates = result;
            return certificates;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'index', __filename, error);
        }
    }
    async indexToFrontWithoutFilterPage(dto, tenant) {
        const { nameCert, endDateValidity, federalRegistration, hasProcurationEcac, codeCompanies, statusCert, federalRegistrationPartial } = dto;
        try {
            let sql = `
                SELECT COUNT(*)
                FROM "${tenant}".certificate AS certificate
                     LEFT JOIN "${tenant}".companie AS companie
                         ON    companie."federalRegistration" = certificate."federalRegistration"                  
                WHERE certificate."idCertificate" IS NOT NULL
            `;
            if (nameCert)
                sql = sql + 'AND certificate."nameCert" LIKE \'%\' || $<nameCert> || \'%\'';
            if (federalRegistration)
                sql = sql + 'AND certificate."federalRegistration" = $<federalRegistration>';
            if (federalRegistrationPartial)
                sql = sql + 'AND companie."federalRegistration" LIKE \'%\' || $<federalRegistrationPartial> || \'%\'';
            if (hasProcurationEcac && hasProcurationEcac === '1')
                sql = sql + 'AND certificate."hasProcurationEcac" = true';
            if (endDateValidity)
                sql = sql + 'AND DATE(certificate."endDateValidity") >= DATE($<endDateValidity>)';
            if (statusCert)
                sql = sql + 'AND CASE WHEN certificate."endDateValidity" < now() THEN \'OVERDUE\' ELSE \'ACTIVE\' END = $<statusCert>';
            if (codeCompanies)
                sql = sql + `\nAND companie."codeCompanieAccountSystem" IN (${codeCompanies})`;
            const result = await this.connection.one(sql, { ...dto });
            const certificates = result;
            return certificates;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'index', __filename, error);
        }
    }
    async show(idCertificate, tenant) {
        try {
            const sql = `
                SELECT certificate.*
                FROM "${tenant}".certificate AS certificate
                WHERE "idCertificate" = $<idCertificate>
            `;
            const result = await this.connection.query(sql, { idCertificate });
            if (!result || result.length === 0)
                throw new common_1.NotFoundException(`Certificate with ID ${idCertificate} not found`);
            const client = result[0];
            return client;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'show', __filename, error);
        }
    }
    async store(certificate, tenant) {
        try {
            const sql = `
                INSERT INTO "${tenant}".certificate("idCertificate", "createdAt", "updatedAt", "password", "commomName", 
                            "startDateValidity", "endDateValidity", "nameCert", "federalRegistration", "eCpfCnpj", "urlSaved")
                VALUES ($<idCertificate>, $<createdAt>, $<updatedAt>, $<password>, $<commomName>, $<startDateValidity>,
                        $<endDateValidity>, $<nameCert>, $<federalRegistration>, $<eCpfCnpj>, $<urlSaved>)
                RETURNING "idCertificate"
            `;
            const result = await this.connection.one(sql, { ...certificate });
            return result;
        }
        catch (error) {
            console.log({ tenant, ...certificate });
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'store', __filename, error);
        }
    }
    async update(certificate, tenant) {
        try {
            const sql = `
                UPDATE "${tenant}".certificate
                SET "updatedAt" = $<updatedAt>, "password" = $<password>, "commomName" = $<commomName>,
                    "startDateValidity" = $<startDateValidity>, "endDateValidity" = $<endDateValidity>,
                    "nameCert" = $<nameCert>, "federalRegistration" = $<federalRegistration>, "eCpfCnpj" = $<eCpfCnpj>,
                    "urlSaved" = $<urlSaved>, "hasProcurationEcac" = $<hasProcurationEcac>
                WHERE "idCertificate" = $<idCertificate>
            `;
            await this.connection.result(sql, { ...certificate });
        }
        catch (error) {
            console.log({ tenant, ...certificate });
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'update', __filename, error);
        }
    }
    async destroy(idCertificate, tenant) {
        try {
            const sql = `
                DELETE
                FROM "${tenant}".certificate AS certificate
                WHERE certificate."idCertificate" = $<idCertificate>
            `;
            const result = await this.connection.result(sql, { idCertificate });
            if (result.rowCount) {
                return (0, make_deleted_success_1.MakeDeleteResult)(`${tenant}.certificate`, idCertificate);
            }
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)(`${tenant}.certificate`, 'destroy', __filename, error);
        }
    }
};
CertificateRepository = __decorate([
    __param(0, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [connection_1.Connection])
], CertificateRepository);
exports.CertificateRepository = CertificateRepository;
//# sourceMappingURL=certificate.repository.js.map