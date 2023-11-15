"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Companie = void 0;
const uuid_1 = require("uuid");
class Companie {
    constructor() {
        if (!this.idCompanie) {
            this.idCompanie = (0, uuid_1.v4)();
        }
    }
}
exports.Companie = Companie;
//# sourceMappingURL=companie.entity.js.map