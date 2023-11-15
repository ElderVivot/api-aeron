"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClientPermissions = void 0;
const uuid_1 = require("uuid");
class UserClientPermissions {
    constructor() {
        if (!this.idUserPermissions) {
            this.idUserPermissions = (0, uuid_1.v4)();
        }
    }
}
exports.UserClientPermissions = UserClientPermissions;
//# sourceMappingURL=user-permissions.entity.js.map