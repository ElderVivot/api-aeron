"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPortalsHasAccess = void 0;
const uuid_1 = require("uuid");
class UserPortalsHasAccess {
    constructor() {
        if (!this.idUserPortalsHasAccess) {
            this.idUserPortalsHasAccess = (0, uuid_1.v4)();
        }
    }
}
exports.UserPortalsHasAccess = UserPortalsHasAccess;
//# sourceMappingURL=user_portals_has_access.entity.js.map