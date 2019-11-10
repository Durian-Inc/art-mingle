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
const Product_1 = require("../Product");
const input_1 = require("../Purchase/input");
const entity_1 = require("./entity");
const input_2 = require("./input");
const products_1 = require("../../lib/products");
const typeorm_1 = require("typeorm");
let ProductResolver = class ProductResolver {
    constructor() {
        this.transactionRepo = typeorm_1.getConnection().getRepository(entity_1.Transaction);
        this.productRepo = typeorm_1.getConnection().getRepository(Product_1.Product);
    }
    async transactions() {
        return this.transactionRepo.find();
    }
    async startMembershipTransaction(context, membershipType) {
        const tag = membershipType.toString();
        const quantity = 1;
        const user = context.state.user;
        const reqProduct = await this.productRepo.findOneOrFail({
            tag
        });
        const purchase = await products_1.purchaseSingleProduct(reqProduct, quantity, user);
        return {
            charged: purchase.transaction.charged,
            clientSecret: purchase.intent.client_secret,
            id: purchase.transaction.id
        };
    }
    async startProductTransaction(context, reqPurchaseInput) {
        const { tag, quantity } = reqPurchaseInput;
        const user = context.state.user;
        const reqProduct = await this.productRepo.findOneOrFail({
            tag
        });
        const purchase = await products_1.purchaseSingleProduct(reqProduct, quantity, user);
        return {
            charged: purchase.transaction.charged,
            clientSecret: purchase.intent.client_secret,
            id: purchase.transaction.id
        };
    }
};
__decorate([
    type_graphql_1.Authorized("view:transactions"),
    type_graphql_1.Query(() => [entity_1.Transaction]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "transactions", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => input_2.TransactionPayload),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("membershipType", () => products_1.MembershipTypes)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "startMembershipTransaction", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => input_2.TransactionPayload),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("purchase", () => input_1.PurchaseInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_1.PurchaseInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "startProductTransaction", null);
ProductResolver = __decorate([
    type_graphql_1.Resolver(() => entity_1.Transaction)
], ProductResolver);
exports.ProductResolver = ProductResolver;
