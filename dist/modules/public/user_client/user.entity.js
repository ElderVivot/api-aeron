"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor() {
        if (!this.idUser) {
            this.idUser = (0, uuid_1.v4)();
        }
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map