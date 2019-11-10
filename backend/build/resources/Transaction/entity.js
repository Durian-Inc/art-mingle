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
const Purchase_1 = require("../Purchase");
const RedemptionCode_1 = require("../RedemptionCode");
const User_1 = require("../User");
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["STARTED"] = "started";
    TransactionStatus["SUCCESS"] = "success";
    TransactionStatus["ERROR"] = "error";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
var PaymentTypes;
(function (PaymentTypes) {
    PaymentTypes["STRIPE"] = "stripe";
    PaymentTypes["REDEMPTION_CODE"] = "redemption-code";
})(PaymentTypes = exports.PaymentTypes || (exports.PaymentTypes = {}));
let Transaction = class Transaction extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Transaction.prototype, "dateCreated", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "intent", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Transaction.prototype, "charged", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        default: PaymentTypes.STRIPE,
        enum: PaymentTypes,
        type: "enum"
    }),
    __metadata("design:type", String)
], Transaction.prototype, "paymentType", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        default: TransactionStatus.STARTED,
        enum: TransactionStatus,
        type: "enum"
    }),
    __metadata("design:type", String)
], Transaction.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.transactions, {
        lazy: true
    }),
    __metadata("design:type", Object)
], Transaction.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [Purchase_1.Purchase]),
    typeorm_1.OneToMany(() => Purchase_1.Purchase, (purchase) => purchase.transaction, {
        lazy: true
    }),
    __metadata("design:type", Object)
], Transaction.prototype, "purchases", void 0);
__decorate([
    type_graphql_1.Field(() => RedemptionCode_1.RedemptionCode),
    typeorm_1.OneToOne(() => RedemptionCode_1.RedemptionCode, (redemptionCode) => redemptionCode.transaction, { lazy: true }),
    __metadata("design:type", Object)
], Transaction.prototype, "redemptionCode", void 0);
Transaction = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Transaction);
exports.Transaction = Transaction;
