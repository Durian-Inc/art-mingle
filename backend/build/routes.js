"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const index_1 = require("./routes/index");
const router = new router_1.default();
exports.router = router;
router.use("/", index_1.router.routes(), index_1.router.allowedMethods());
