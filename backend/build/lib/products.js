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
const Product_1 = require("../resources/Product");
const Purchase_1 = require("../resources/Purchase");
const Transaction_1 = require("../resources/Transaction");
const errors_1 = require("./errors");
const stripe_1 = require("./stripe");
exports.YEARLY_MEMBERSHIP = {
    tag: "yearly-membership"
};
exports.SEMESTERLY_MEMBERSHIP = {
    tag: "semesterly-membership"
};
var MembershipTypes;
(function (MembershipTypes) {
    MembershipTypes["YEARLY"] = "yearly-membership";
    MembershipTypes["SEMESTERLY"] = "semesterly-membership";
})(MembershipTypes = exports.MembershipTypes || (exports.MembershipTypes = {}));
const addDates = {
    [MembershipTypes.SEMESTERLY]: 6,
    [MembershipTypes.YEARLY]: 12
};
type_graphql_1.registerEnumType(MembershipTypes, {
    name: "MembershipTypes",
    description: "Different types of ACM memberships one can have."
});
let MembershipProduct = class MembershipProduct {
};
__decorate([
    type_graphql_1.Field(() => MembershipTypes),
    __metadata("design:type", String)
], MembershipProduct.prototype, "tag", void 0);
MembershipProduct = __decorate([
    type_graphql_1.ObjectType()
], MembershipProduct);
exports.MembershipProduct = MembershipProduct;
exports.purchaseSingleProduct = async (product, quantity, user) => {
    const reqProductPurchase = Purchase_1.Purchase.create({
        product,
        quantity
    });
    await reqProductPurchase.save();
    const normalizedCost = product.price * 100 * quantity;
    const intent = await stripe_1.stripe.paymentIntents.create({
        amount: normalizedCost,
        currency: "usd",
        description: product.displayName,
        metadata: {
            email: user.email,
            productTag: product.tag,
            userId: user.id
        },
        payment_method_types: ["card"],
        receipt_email: user.email,
        statement_descriptor: `ACM* ${product.statementDescriptor}`
    });
    const newTransaction = Transaction_1.Transaction.create({
        charged: normalizedCost,
        intent: intent.id,
        purchases: [reqProductPurchase],
        user
    });
    const savedTransaction = await newTransaction.save();
    return Promise.resolve({ transaction: savedTransaction, intent });
};
exports.fulfillProduct = async (productTag, user) => {
    const curDate = new Date();
    if (productTag in addDates) {
        let newMonth = curDate.getMonth() + addDates[productTag];
        const normalizedMonth = (newMonth % 12) + 1;
        if (normalizedMonth > 5 && normalizedMonth < 8) {
            newMonth += 8 - normalizedMonth;
        }
        user.membershipExpiration = new Date(curDate.setMonth(newMonth));
        await user.save();
    }
    else {
        throw new errors_1.BadUserInputError("We currently only support fulfilling ACM membership");
    }
};
exports.createTransactionFromTags = async (productTags, isRedeemed) => {
    const products = await Product_1.Product.findByIds(productTags);
    if (products.length !== productTags.length) {
        throw new errors_1.BadUserInputError("Specified products tags could not be found or you have requested duplicate products.");
    }
    const purchases = [];
    const quantity = 1;
    let cost = 0;
    for (const product of products) {
        const purchase = Purchase_1.Purchase.create({
            product,
            quantity: 1
        });
        cost += product.price * 100 * quantity;
        purchases.push(await purchase.save());
    }
    return await Transaction_1.Transaction.create({
        charged: cost,
        paymentType: isRedeemed
            ? Transaction_1.PaymentTypes.REDEMPTION_CODE
            : Transaction_1.PaymentTypes.STRIPE,
        purchases
    }).save();
};
