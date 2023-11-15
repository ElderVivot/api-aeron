"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionFactory = exports.Connection = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
require("dotenv/config");
const configConnection = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME
};
class Connection {
    constructor() {
        if (!this.connection) {
            this.connection = (0, pg_promise_1.default)()(configConnection);
        }
    }
    async query(text, params) {
        const result = await this.connection.query(text, params);
        return result;
    }
    async one(text, params) {
        const result = await this.connection.one(text, params);
        return result;
    }
    async result(text, params) {
        const result = await this.connection.result(text, params);
        return result;
    }
}
exports.Connection = Connection;
exports.connectionFactory = {
    provide: 'CONNECTION',
    useFactory: () => {
        return new Connection();
    }
};
//# sourceMappingURL=connection.js.map