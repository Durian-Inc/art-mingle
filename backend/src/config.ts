export interface IConfig {
  JWT_ALGORITHM: string;
  JWT_AUDIENCE: string;
  JWT_ISSUER: string;
  JWT_JWKS_URI: string;
  JWT_USERINFO_URI: string;
  SECRET_APP_KEY: string;
  NODE_ENV: string;
  ext: string;
  host: string;
  port: number;
}

const { AUTH0_DOMAIN } = process.env;
export const config: IConfig = {
  JWT_ALGORITHM: "RS256",
  JWT_AUDIENCE: "graphql.mstacm.org",
  JWT_ISSUER: `https://${AUTH0_DOMAIN}/`,
  JWT_JWKS_URI: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  JWT_USERINFO_URI: `https://${AUTH0_DOMAIN}/userinfo`,
  NODE_ENV: process.env.NODE_ENV || "development",
  SECRET_APP_KEY: process.env.SECRET_APP_KEY || "DEV_KEY",
  ext: process.env.NODE_ENV !== "production" ? ".ts" : ".js",
  host: process.env.HOST || "0.0.0.0",
  port: parseInt(process.env.NODE_PORT || "3000", 10)
};
