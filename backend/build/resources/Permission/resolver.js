"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const entity_1 = require("./entity");
const input_1 = require("./input");
let PermissionResolver = class PermissionResolver {
    constructor() {
        this.repository = typeorm_1.getRepository(entity_1.Permission);
    }
    async permissions() {
        return this.repository.find();
    }
    async createPermission(input) {
        const newResource = this.repository.create({ ...input });
        return newResource.save();
    }
};
__decorate([
    type_graphql_1.Authorized("view:permissions"),
    type_graphql_1.Query(() => [entity_1.Permission]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionResolver.prototype, "permissions", null);
__decorate([
    type_graphql_1.Authorized("create:permissions"),
    type_graphql_1.Mutation(() => entity_1.Permission),
    __param(0, type_graphql_1.Arg("data", () => input_1.PermissionCreateInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionResolver.prototype, "createPermission", null);
PermissionResolver = __decorate([
    type_graphql_1.Resolver(() => entity_1.Permission)
], PermissionResolver);
exports.PermissionResolver = PermissionResolver;
