"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogNotaFiscal = void 0;
const uuid_1 = require("uuid");
class LogNotaFiscal {
    constructor() {
        if (!this.idLogNotaFiscal) {
            this.idLogNotaFiscal = (0, uuid_1.v4)();
        }
    }
}
exports.LogNotaFiscal = LogNotaFiscal;
//# sourceMappingURL=log-nota-fiscal.entity.js.map