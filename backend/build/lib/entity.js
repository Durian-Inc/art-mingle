"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mergeEntityLists(lhs, rhs) {
    return [...new Set([...lhs, ...rhs])];
}
exports.mergeEntityLists = mergeEntityLists;
