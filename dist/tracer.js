"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const dd_trace_1 = __importDefault(require("dd-trace"));
const DD_ENV = process.env.DD_ENV || 'dev';
if (DD_ENV === 'prod')
    dd_trace_1.default.init();
exports.default = dd_trace_1.default;
//# sourceMappingURL=tracer.js.map