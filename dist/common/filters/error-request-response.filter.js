"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRequestResponseFilter = void 0;
const make_error_request_response_1 = require("../factories/make-error-request-response");
const common_1 = require("@nestjs/common");
let ErrorRequestResponseFilter = class ErrorRequestResponseFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        console.log(exception.stack);
        response
            .status(status)
            .json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            urlRequest: request.url,
            stackError: exception.stack,
            ...exception
        });
    }
};
ErrorRequestResponseFilter = __decorate([
    (0, common_1.Catch)(make_error_request_response_1.ErrorRequestResponse)
], ErrorRequestResponseFilter);
exports.ErrorRequestResponseFilter = ErrorRequestResponseFilter;
//# sourceMappingURL=error-request-response.filter.js.map