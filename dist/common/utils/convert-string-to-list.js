"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringToListString = void 0;
function convertStringToListString(data) {
    if (!data)
        return null;
    if (data.indexOf(',') > 0)
        return "'" + data.normalize('NFD').replace(/[^0-9a-zA-Z,_/ ]/g, '').replace(/[,/]/g, "','") + "'";
    else
        return "'" + data + "'";
}
exports.convertStringToListString = convertStringToListString;
//# sourceMappingURL=convert-string-to-list.js.map