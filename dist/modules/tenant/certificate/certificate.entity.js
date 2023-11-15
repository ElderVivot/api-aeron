"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Certificate = void 0;
const uuid_1 = require("uuid");
class Certificate {
    constructor() {
        if (!this.idCertificate) {
            this.idCertificate = (0, uuid_1.v4)();
        }
    }
}
exports.Certificate = Certificate;
//# sourceMappingURL=certificate.entity.js.map