"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const { readdir, lstat } = fs_1.default.promises;
async function getFiles(folder) {
    try {
        const items = await readdir(folder);
        let files = [];
        for (const item of items) {
            const pathFileOrFolder = `${folder}/${item}`;
            const isDirectory = (await lstat(pathFileOrFolder)).isDirectory();
            if (isDirectory) {
                files = [...files, ...(await getFiles(pathFileOrFolder))];
            }
            else
                files.push(pathFileOrFolder);
        }
        return files;
    }
    catch (e) {
        return e;
    }
}
exports.getFiles = getFiles;
//# sourceMappingURL=get-files.js.map