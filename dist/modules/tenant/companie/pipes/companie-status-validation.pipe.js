"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const e_companie_status_1 = require("../types/e-companie-status");
class ClientStatusValidationPipe {
    constructor() {
        this.allowedStatuses = [...Object.keys(e_companie_status_1.ECompanieStatus)];
    }
    isStatusValid(status) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
    transform(value) {
        if (!value) {
            throw new common_1.BadRequestException("It's necessary pass value for status");
        }
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`Value for status is invalid: ${value}`);
        }
        return value;
    }
}
exports.ClientStatusValidationPipe = ClientStatusValidationPipe;
//# sourceMappingURL=companie-status-validation.pipe.js.map