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
const errors_1 = require("../../lib/errors");
const products_1 = require("../../lib/products");
const entity_1 = require("../../lib/entity");
const Permission_1 = require("../Permission");
const Group_1 = require("../Group");
const entity_2 = require("./entity");
const nanoid = require("nanoid");
const FOURTEEN_DAYS_IN_MILLISECONDS = 12096e5;
let RedemptionCodeResolver = class RedemptionCodeResolver {
    async redemptionCodes() {
        return entity_2.RedemptionCode.find();
    }
    async createRedemptionCode(productTags, permissionIds, groupIds) {
        if (!productTags && !permissionIds && !groupIds) {
            throw new errors_1.BadUserInputError("Did not specify anything to redeem in the redemption code.");
        }
        let transaction = undefined;
        if (productTags) {
            if (productTags.length > 1) {
                throw new errors_1.BadUserInputError("We currently only support redemption codes that have 1 product tag.");
            }
            transaction = products_1.createTransactionFromTags(productTags, true);
        }
        let resolvedPermissions = undefined;
        if (permissionIds) {
            const permissions = await Permission_1.Permission.findByIds(permissionIds);
            if (permissions.length !== permissionIds.length) {
                throw new errors_1.BadUserInputError("Specified permission ids are duplicated and/or do not exist in the database.");
            }
            resolvedPermissions = permissions;
        }
        let resolvedGroups = undefined;
        if (groupIds) {
            const groups = await Group_1.Group.findByIds(groupIds);
            if (groups.length !== groupIds.length) {
                throw new errors_1.BadUserInputError("Specified group ids are duplicated and/or do not exist in the database.");
            }
            resolvedGroups = groups;
        }
        const redemptionCode = entity_2.RedemptionCode.create({
            expirationDate: new Date(Date.now() + FOURTEEN_DAYS_IN_MILLISECONDS),
            id: nanoid(12),
            transaction: transaction ? await transaction : undefined,
            permissions: resolvedPermissions,
            groups: resolvedGroups
        });
        return redemptionCode.save();
    }
    async redeemRedemptionCode(context, code) {
        const user = context.state.user;
        const redemptionCode = await entity_2.RedemptionCode.findOneOrFail({
            id: code
        });
        if (redemptionCode.redeemed || new Date() > redemptionCode.expirationDate) {
            throw new errors_1.BadUserInputError("Redemption code has expired or already been redeemed.");
        }
        const transaction = await redemptionCode.transaction;
        if (transaction) {
            transaction.user = user;
            await transaction.save();
            const purchases = await transaction.purchases;
            if (purchases.length > 1) {
                throw new errors_1.BadUserInputError("We currently only support redeeming transactions with 1 purchase.");
            }
            const product = await purchases[0].product;
            await products_1.fulfillProduct(product.tag, user);
        }
        user.permissions = entity_1.mergeEntityLists(await user.permissions, await redemptionCode.permissions);
        user.groups = entity_1.mergeEntityLists(await user.groups, await redemptionCode.groups);
        await user.save();
        redemptionCode.redeemed = true;
        return redemptionCode.save();
    }
};
__decorate([
    type_graphql_1.Authorized("view:redemption_codes"),
    type_graphql_1.Query(() => [entity_2.RedemptionCode]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RedemptionCodeResolver.prototype, "redemptionCodes", null);
__decorate([
    type_graphql_1.Authorized("create:redemption_codes"),
    type_graphql_1.Mutation(() => entity_2.RedemptionCode),
    __param(0, type_graphql_1.Arg("productTags", (_) => [String], { nullable: true })),
    __param(1, type_graphql_1.Arg("permissionIds", (_) => [String], { nullable: true })),
    __param(2, type_graphql_1.Arg("groupIds", (_) => [String], { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Array, Array]),
    __metadata("design:returntype", Promise)
], RedemptionCodeResolver.prototype, "createRedemptionCode", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => entity_2.RedemptionCode),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("redemptionCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RedemptionCodeResolver.prototype, "redeemRedemptionCode", null);
RedemptionCodeResolver = __decorate([
    type_graphql_1.Resolver(() => entity_2.RedemptionCode)
], RedemptionCodeResolver);
exports.RedemptionCodeResolver = RedemptionCodeResolver;
