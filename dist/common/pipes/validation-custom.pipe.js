"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipeCustom = void 0;
const common_1 = require("@nestjs/common");
class ValidationPipeCustom extends common_1.ValidationPipe {
    constructor(options) {
        super({ ...options, whitelist: true });
        this.options = options;
    }
}
exports.ValidationPipeCustom = ValidationPipeCustom;
//# sourceMappingURL=validation-custom.pipe.js.map