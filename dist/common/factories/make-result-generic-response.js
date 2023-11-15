"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeResultGenericResponse = void 0;
function MakeResultGenericResponse(message, statusCode = 400) {
    return {
        message,
        statusCode
    };
}
exports.MakeResultGenericResponse = MakeResultGenericResponse;
//# sourceMappingURL=make-result-generic-response.js.map