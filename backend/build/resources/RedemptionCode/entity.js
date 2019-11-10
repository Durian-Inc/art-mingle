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
const Group_1 = require("../Group");
const Transaction_1 = require("../Transaction");
let RedemptionCode = class RedemptionCode extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], RedemptionCode.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], RedemptionCode.prototype, "dateCreated", void 0);
__decorate([
    type_graphql_1.Field({ defaultValue: false }),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], RedemptionCode.prototype, "redeemed", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Date)
], RedemptionCode.prototype, "expirationDate", void 0);
__decorate([
    type_graphql_1.Field(() => Transaction_1.Transaction),
    typeorm_1.OneToOne(() => Transaction_1.Transaction, (transaction) => transaction.redemptionCode, { lazy: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Object)
], RedemptionCode.prototype, "transaction", void 0);
__decorate([
    type_graphql_1.Field((_) => [Permission_1.Permission]),
    typeorm_1.ManyToMany((_) => Permission_1.Permission, (permission) => permission.redemptionCodes, { lazy: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Object)
], RedemptionCode.prototype, "permissions", void 0);
__decorate([
    type_graphql_1.Field((_) => [Group_1.Group]),
    typeorm_1.ManyToMany((_) => Group_1.Group, (group) => group.redemptionCodes, {
        lazy: true
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Object)
], RedemptionCode.prototype, "groups", void 0);
RedemptionCode = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], RedemptionCode);
exports.RedemptionCode = RedemptionCode;
