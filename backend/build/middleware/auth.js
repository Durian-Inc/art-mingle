"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_passport_1 = __importDefault(require("koa-passport"));
exports.passport = koa_passport_1.default;
const axios_1 = __importDefault(require("axios"));
const jwks_rsa_1 = require("jwks-rsa");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("../config");
const User_1 = require("../resources/User");
exports.authFromBearer = async (ctx, next) => {
    if (ctx.headers.authorization) {
        await koa_passport_1.default.authenticate("jwt", { session: false }, async (_, user, info) => {
            if (user) {
                await ctx.login(user);
            }
            if (info && info.scope) {
                ctx.state.scope = info.scope || undefined;
            }
        })(ctx, next);
    }
    await next();
};
const JWT_OPTS = {
    algorithms: [config_1.config.JWT_ALGORITHM],
    audience: config_1.config.JWT_AUDIENCE,
    issuer: config_1.config.JWT_ISSUER,
    passReqToCallback: true,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKeyProvider: jwks_rsa_1.passportJwtSecret({
        cache: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config_1.config.JWT_JWKS_URI,
        rateLimit: true
    })
};
koa_passport_1.default.use(new passport_jwt_1.Strategy(JWT_OPTS, async (req, payload, done) => {
    const { sub, scope } = payload;
    if (sub.includes("@clients")) {
        done(undefined, undefined, { scope });
        return;
    }
    try {
        let user = await User_1.User.findOne({
            sub
        });
        if (!user) {
            const response = await axios_1.default.get(config_1.config.JWT_USERINFO_URI, {
                headers: {
                    Authorization: req.headers.authorization
                }
            });
            const userInfo = response.data;
            if (!userInfo) {
                throw new Error("User information not returned from request.");
            }
            user = new User_1.User();
            user.firstName = userInfo.given_name;
            user.lastName = userInfo.family_name;
            user.email = userInfo.email;
            user.emailVerified = userInfo.email_verified;
            user.profilePictureUrl = userInfo.picture;
            user.sub = userInfo.sub;
            user = await user.save();
        }
        done(undefined, user, { scope });
    }
    catch (err) {
        console.error("Login error", err);
        done(err, undefined);
    }
}));
koa_passport_1.default.serializeUser((user, done) => {
    done(undefined, user.id);
});
koa_passport_1.default.deserializeUser(async (userID, done) => {
    const user = await User_1.User.findOne({ id: userID });
    if (user) {
        done(undefined, user);
    }
    else {
        done(undefined, false);
    }
});
