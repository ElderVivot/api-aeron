"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const e_client_status_1 = require("../enums/e-client-status");
class ClientStatusValidationPipe {
    constructor() {
        this.allowedStatuses = [...Object.keys(e_client_status_1.EClientStatus)];
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
//# sourceMappingURL=client-status-validation.pipe.js.map