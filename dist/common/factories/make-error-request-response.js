"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeErrorRequestResponseV2 = exports.ErrorRequestResponse = exports.MakeErrorRequestResponse = void 0;
const common_1 = require("@nestjs/common");
function MakeErrorRequestResponse(repository, method, filePath, error) {
    var _a, _b;
    return {
        repository,
        method,
        filePath,
        error: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.message) || error.toString(),
        statusCode: ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400
    };
}
exports.MakeErrorRequestResponse = MakeErrorRequestResponse;
class ErrorRequestResponse extends common_1.HttpException {
    constructor(repository, method, filePath, error) {
        var _a, _b, _c, _d, _e;
        super({}, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.statusCode) || ((_b = error.message) === null || _b === void 0 ? void 0 : _b.status) || 400);
        this.repository = repository;
        this.method = method;
        this.filePath = filePath;
        this.message = error;
        this.name = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.message) || error.toString();
        this.statusCode = ((_d = error.response) === null || _d === void 0 ? void 0 : _d.statusCode) || ((_e = error.message) === null || _e === void 0 ? void 0 : _e.status) || 400;
    }
}
exports.ErrorRequestResponse = ErrorRequestResponse;
function MakeErrorRequestResponseV2(repository, method, filePath, error, dto) {
    console.log(dto);
    throw new ErrorRequestResponse(repository, method, filePath, error);
}
exports.MakeErrorRequestResponseV2 = MakeErrorRequestResponseV2;
//# sourceMappingURL=make-error-request-response.js.map