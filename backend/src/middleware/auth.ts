import passport from "koa-passport";

import { passportJwtSecret } from "jwks-rsa";
import { IVerifyOptions } from "passport-http-bearer";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
  VerifiedCallback
} from "passport-jwt";

import { config } from "../config";
import { IContext, IUserInfo } from "../lib/interfaces";

import { User } from "../resources/User";

interface IPassportCallback extends VerifiedCallback {
  (error: any, user?: User, options?: IVerifyOptions): void;
}

export const authFromBearer = async (
  ctx: IContext,
  next: (err?: any) => Promise<any>
) => {
  if (ctx.headers.authorization) {
    await passport.authenticate(
      "jwt",
      { session: false },
      async (_: any, user?: User, info?: IVerifyOptions) => {
        if (user) {
          await ctx.login(user);
        }

        if (info && info.scope) {
          ctx.state.scope = (info.scope as string) || undefined;
        }
      }
    )(ctx, next);
  }

  await next();
};

const JWT_OPTS: StrategyOptions = {
  algorithms: [config.JWT_ALGORITHM],
  issuer: config.JWT_ISSUER,
  passReqToCallback: true,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKeyProvider: passportJwtSecret({
    cache: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.JWT_JWKS_URI,
    rateLimit: true
  })
};

passport.use(
  new JwtStrategy(
    JWT_OPTS,
    async (_: any, payload: any, done: IPassportCallback) => {
      const { sub, scope } = payload;
      if (sub.includes("@clients")) {
        done(undefined, undefined, { scope });

        return;
      }

      try {
        let user = await User.findOne({
          email: payload.email
        });

        // If we don't find the user, we need to create them in our database.
        // This can late be replaced with something like
        // https://auth0.com/docs/hooks/concepts/post-user-registration-extensibility-point
        if (!user) {
          // The user should be giving us their access token
          // https://auth0.com/docs/api-auth/why-use-access-tokens-to-secure-apis
          // ; therefore, we need to fetch their data from auth0 if they haven't
          // been created yet.
          const userInfo: IUserInfo | undefined = payload;

          if (!userInfo) {
            throw new Error("User information not returned from request.");
          }

          user = new User();
          user.firstName = userInfo.given_name;
          user.lastName = userInfo.family_name;
          user.email = userInfo.email;
          user.emailVerified = userInfo.email_verified;
          user.profilePictureUrl = userInfo.picture;
          user.sub = userInfo.sub;
          user = await user.save();
        }
        done(undefined, user, { scope });
      } catch (err) {
        console.error("Login error", err);
        done(err, undefined);
      }
    }
  )
);

passport.serializeUser((user: User, done: IPassportCallback) => {
  done(undefined, user.id);
});

passport.deserializeUser(async (userID: string, done: IPassportCallback) => {
  const user = await User.findOne({ id: userID });
  if (user) {
    done(undefined, user);
  } else {
    done(undefined, false);
  }
});

export { passport };
