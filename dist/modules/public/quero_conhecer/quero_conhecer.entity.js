"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueroConhecer = void 0;
const uuid_1 = require("uuid");
class QueroConhecer {
    constructor() {
        if (!this.idQueroConhecer) {
            this.idQueroConhecer = (0, uuid_1.v4)();
        }
    }
}
exports.QueroConhecer = QueroConhecer;
//# sourceMappingURL=quero_conhecer.entity.js.map