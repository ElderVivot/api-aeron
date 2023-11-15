"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeDeleteResult = void 0;
function MakeDeleteResult(repository, id) {
    return {
        repository,
        id,
        type: 'success',
        message: 'Deleted with success'
    };
}
exports.MakeDeleteResult = MakeDeleteResult;
//# sourceMappingURL=make-deleted-success.js.map