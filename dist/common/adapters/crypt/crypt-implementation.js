"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptImplementation = void 0;
const bcrypt = __importStar(require("bcrypt"));
const crypto_js_1 = __importDefault(require("crypto-js"));
class CryptImplementation {
    async generateSalt() {
        return await bcrypt.genSalt();
    }
    async hash(password) {
        return await bcrypt.hash(password, 10);
    }
    async compare(password, passwordEncrypted) {
        return await bcrypt.compare(password, passwordEncrypted);
    }
    encrypt(text) {
        return crypto_js_1.default.AES.encrypt(text, process.env.HASH_SECRET).toString();
    }
    decrypt(text) {
        const bytes = crypto_js_1.default.AES.decrypt(text, process.env.HASH_SECRET);
        return bytes.toString(crypto_js_1.default.enc.Utf8);
    }
}
exports.CryptImplementation = CryptImplementation;
//# sourceMappingURL=crypt-implementation.js.map