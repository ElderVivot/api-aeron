"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessPortals = void 0;
const uuid_1 = require("uuid");
class AccessPortals {
    constructor() {
        if (!this.idAccessPortals) {
            this.idAccessPortals = (0, uuid_1.v4)();
        }
    }
}
exports.AccessPortals = AccessPortals;
//# sourceMappingURL=access_portals.entity.js.map