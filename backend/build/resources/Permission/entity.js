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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const RedemptionCode_1 = require("../RedemptionCode");
const Group_1 = require("../Group");
const User_1 = require("../User");
let Permission = class Permission extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Permission.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Group_1.Group, (group) => group.permissions, {
        lazy: true
    }),
    __metadata("design:type", Object)
], Permission.prototype, "groups", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User]),
    typeorm_1.ManyToMany(() => User_1.User, (user) => user.permissions, {
        lazy: true
    }),
    __metadata("design:type", Object)
], Permission.prototype, "users", void 0);
__decorate([
    type_graphql_1.Field(() => [RedemptionCode_1.RedemptionCode]),
    typeorm_1.ManyToMany(() => RedemptionCode_1.RedemptionCode, (redemptionCode) => redemptionCode.permissions, {
        lazy: true
    }),
    __metadata("design:type", Object)
], Permission.prototype, "redemptionCodes", void 0);
Permission = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Permission);
exports.Permission = Permission;
