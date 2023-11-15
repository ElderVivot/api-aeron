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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsResumeService = void 0;
const date_factory_1 = require("../../../common/adapters/date/date-factory");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const common_1 = require("@nestjs/common");
const client_repository_1 = require("../client/client.repository");
const clients_resume_repository_1 = require("./clients_resume.repository");
let ClientsResumeService = class ClientsResumeService {
    constructor(repository, clientRepository) {
        this.repository = repository;
        this.clientRepository = clientRepository;
        this.dateImplementation = (0, date_factory_1.makeDateImplementation)();
    }
    async index(filter) {
        try {
            const dataResult = [];
            const clients = await this.clientRepository.index(filter);
            if (clients instanceof make_error_request_response_1.ErrorRequestResponse)
                throw clients;
            for (const client of clients) {
                const tenant = client.idClient.substring(0, 15);
                const qtdRecordCompanie = await this.repository.getDataCompanies(tenant, filter.competence);
                if (qtdRecordCompanie instanceof make_error_request_response_1.ErrorRequestResponse)
                    throw qtdRecordCompanie;
                const qtdRecordGOResult = await this.repository.getDataFromLogNotaFiscalGO(tenant, filter.competence);
                if (qtdRecordGOResult instanceof make_error_request_response_1.ErrorRequestResponse)
                    throw qtdRecordGOResult;
                const qtdRecordGYNResult = await this.repository.getDataFromLogNotaNFsGYN(tenant, filter.competence);
                if (qtdRecordGYNResult instanceof make_error_request_response_1.ErrorRequestResponse)
                    throw qtdRecordGOResult;
                dataResult.push({
                    tenant,
                    name: client.name,
                    typeFederalRegistration: client.typeFederalRegistration,
                    federalRegistration: client.federalRegistration,
                    status: client.status,
                    dateAsClient: client.dateAsClient,
                    competence: new Date(filter.competence),
                    qtdCompaniesActive: Number(qtdRecordCompanie.qtd),
                    qtdRecordGOSaidasSuccess: Number(qtdRecordGOResult.success),
                    qtdRecordGOSaidasWarning: Number(qtdRecordGOResult.warning),
                    qtdRecordGOSaidasToProcess: Number(qtdRecordGOResult.to_process),
                    qtdRecordGOSaidasProcessing: Number(qtdRecordGOResult.processing),
                    qtdRecordGOSaidasError: Number(qtdRecordGOResult.error),
                    qtdRecordGOSaidasTotal: Number(qtdRecordGOResult.total),
                    lastUpdateInRecordGOSaidasTotal: qtdRecordGOResult.lastUpdatedSuccess,
                    qtdRecordGYNServicosSuccess: Number(qtdRecordGYNResult.success),
                    qtdRecordGYNServicosWarning: Number(qtdRecordGYNResult.warning),
                    qtdRecordGYNServicosToProcess: Number(qtdRecordGYNResult.to_process),
                    qtdRecordGYNServicosProcessing: Number(qtdRecordGYNResult.processing),
                    qtdRecordGYNServicosError: Number(qtdRecordGYNResult.error),
                    qtdRecordGYNServicosTotal: Number(qtdRecordGYNResult.total),
                    lastUpdateInRecordGYNServicosTotal: qtdRecordGYNResult.lastUpdatedSuccess
                });
            }
            return dataResult;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.clients_resume', 'index', __filename, error);
        }
    }
    async indexQtdRecordsInAnyTable(tableName) {
        try {
            const dataResult = [];
            const clients = await this.clientRepository.index({});
            if (clients instanceof make_error_request_response_1.ErrorRequestResponse)
                throw clients;
            for (const client of clients) {
                const tenant = client.idClient.substring(0, 15);
                const qtdRecordAnyTable = await this.repository.getQtdRecordsInAnyTable(tenant, tableName);
                if (qtdRecordAnyTable instanceof make_error_request_response_1.ErrorRequestResponse)
                    throw qtdRecordAnyTable;
                dataResult.push({
                    tenant,
                    name: client.name,
                    typeFederalRegistration: client.typeFederalRegistration,
                    federalRegistration: client.federalRegistration,
                    status: client.status,
                    dateAsClient: client.dateAsClient,
                    tableName,
                    qtdRecords: Number(qtdRecordAnyTable.qtd)
                });
            }
            return dataResult;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.clients_resume', 'indexQtdRecordsInAnyTable', __filename, error);
        }
    }
};
ClientsResumeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_resume_repository_1.ClientsResumeRepository,
        client_repository_1.ClientRepository])
], ClientsResumeService);
exports.ClientsResumeService = ClientsResumeService;
//# sourceMappingURL=clients_resume.service.js.map