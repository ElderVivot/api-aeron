"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPassword = void 0;
const uuid_1 = require("uuid");
class ResetPassword {
    constructor() {
        if (!this.idResetPassword) {
            this.idResetPassword = (0, uuid_1.v4)();
        }
    }
}
exports.ResetPassword = ResetPassword;
//# sourceMappingURL=reset-password.entity.js.map