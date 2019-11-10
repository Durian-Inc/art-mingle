"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const config_1 = require("../config");
const products_1 = require("../lib/products");
const stripe_1 = require("../lib/stripe");
const User_1 = require("../resources/User");
const router = new router_1.default();
exports.router = router;
router.post("callback", async (ctx) => {
    let stripeEvent;
    const signature = ctx.request.headers["stripe-signature"] || "";
    try {
        stripeEvent = stripe_1.stripe.webhooks.constructEvent(ctx.request.rawBody, signature, config_1.config.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        ctx.throw(400, `Webhook Error: ${err.message}`);
        return;
    }
    switch (stripeEvent.type) {
        case "payment_intent.succeeded":
            const intent = stripeEvent.data
                .object;
            const productTag = intent.metadata.productTag;
            const userId = intent.metadata.userId;
            if (!userId || !productTag) {
                ctx.status = 200;
                return;
            }
            const user = await User_1.User.findOneOrFail({ id: userId });
            try {
                await products_1.fulfillProduct(productTag, user);
            }
            catch (e) {
                ctx.throw(500, `Webhook Error: Unexpected error: ${e.message}`);
            }
            break;
        default:
            ctx.throw(400, `Webhook Error: Unexpected event ${stripeEvent.type}`);
            return;
    }
    ctx.status = 200;
    return;
});
