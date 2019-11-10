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
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Permission_1 = require("../Permission");
const User_1 = require("../User");
const RedemptionCode_1 = require("../RedemptionCode");
let Group = class Group extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field((_) => [User_1.User]),
    typeorm_1.ManyToMany((_) => User_1.User, (user) => user.groups, {
        lazy: true
    }),
    __metadata("design:type", Object)
], Group.prototype, "users", void 0);
__decorate([
    type_graphql_1.Field((_) => [Permission_1.Permission]),
    typeorm_1.ManyToMany((_) => Permission_1.Permission, (permission) => permission.groups, { lazy: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Object)
], Group.prototype, "permissions", void 0);
__decorate([
    type_graphql_1.Field(() => [RedemptionCode_1.RedemptionCode]),
    typeorm_1.ManyToMany(() => RedemptionCode_1.RedemptionCode, (redemptionCode) => redemptionCode.groups, {
        lazy: true
    }),
    __metadata("design:type", Object)
], Group.prototype, "redemptionCodes", void 0);
Group = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Group);
exports.Group = Group;
