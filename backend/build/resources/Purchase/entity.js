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
const Product_1 = require("../Product");
const Transaction_1 = require("../Transaction");
let Purchase = class Purchase extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], Purchase.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Purchase.prototype, "quantity", void 0);
__decorate([
    type_graphql_1.Field(() => Product_1.Product),
    typeorm_1.ManyToOne(() => Product_1.Product, (product) => product.purchases, {
        lazy: true
    }),
    __metadata("design:type", Object)
], Purchase.prototype, "product", void 0);
__decorate([
    type_graphql_1.Field(() => [Transaction_1.Transaction]),
    typeorm_1.ManyToOne(() => Transaction_1.Transaction, (transaction) => transaction.purchases, {
        lazy: true
    }),
    __metadata("design:type", Object)
], Purchase.prototype, "transaction", void 0);
Purchase = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Purchase);
exports.Purchase = Purchase;
