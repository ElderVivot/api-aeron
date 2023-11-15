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
exports.MigrationService = void 0;
const common_1 = require("@nestjs/common");
const migration_repository_1 = require("./migration.repository");
let MigrationService = class MigrationService {
    constructor(repository) {
        this.repository = repository;
    }
    async index(getFilter) {
        return await this.repository.index(getFilter);
    }
    async show(id) {
        return await this.repository.show(id);
    }
};
MigrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [migration_repository_1.MigrationRepository])
], MigrationService);
exports.MigrationService = MigrationService;
//# sourceMappingURL=migration.service.js.map