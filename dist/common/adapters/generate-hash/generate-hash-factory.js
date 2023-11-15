"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGeneratePasswordImplementation = void 0;
const generate_hash_implementation_1 = require("./generate-hash-implementation");
function makeGeneratePasswordImplementation() {
    return new generate_hash_implementation_1.GeneratePasswordImplementation();
}
exports.makeGeneratePasswordImplementation = makeGeneratePasswordImplementation;
//# sourceMappingURL=generate-hash-factory.js.map