"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratePasswordImplementation = void 0;
const generate_password_1 = require("generate-password");
class GeneratePasswordImplementation {
    generatePassword(symbols = true) {
        return (0, generate_password_1.generate)({
            length: 15,
            symbols
        });
    }
}
exports.GeneratePasswordImplementation = GeneratePasswordImplementation;
//# sourceMappingURL=generate-hash-implementation.js.map